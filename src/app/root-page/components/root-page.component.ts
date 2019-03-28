import { Component, OnInit } from '@angular/core';
import { WaterService } from '../../water/services/water.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WaterStateModel } from '../../state/water-state.model';
import { Store } from '@ngxs/store';
import {
  AddGrainBill,
  AddWaterAdjustment,
  AddWaterReport,
  LoadWater
} from '../../state/water.actions';
import { WaterModel } from '../../water/models/water-model';
import { Router } from '@angular/router';
import { StateReset } from 'ngxs-reset-plugin';
import { WaterState } from '../../state/water.state';

@Component({
  selector: 'app-root-page',
  templateUrl: './root-page.component.html'
})
export class RootPageComponent implements OnInit {

  private ngUnsubscribe: Subject<any>;
  waters: WaterStateModel[];
  selectedWater: WaterStateModel;

  constructor(private store: Store, private waterService: WaterService, private router: Router) {
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit() {
    this.store.selectOnce(state => state.water)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((water: WaterStateModel) => {
        if (water.id !== 0) {
          this.selectedWater = water;
        }
      });
    this.waterService.getAllWaters()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((waters) => this.waters = waters);
  }

  onStart() {
    this.store.dispatch(new StateReset(WaterState));
    this.router.navigate(['/water/water-report']);
  }

  onDelete() {
    this.waterService.deleteAllWater().subscribe(
      () => {
        alert('All waters deleted!');
        this.store.dispatch(new StateReset(WaterState));
        this.waters = null;
      }
    );
  }

  onWaterChange() {
    if (!this.selectedWater) {
      this.store.dispatch(new StateReset(WaterState));
      return;
    }
    this.waterService.loadWater(this.selectedWater.id)
      .pipe(
        map((water: WaterModel) => {
          return {
            id: water.id,
            name: water.name,
            beerStyleId: water.beerStyleId,
            beerStyle: water.beerStyle,
            waterReport: water.waterReport,
            grainBill: {
              grains: water.grains
            },
            waterAdjustment: water.waterAdjustment
          } as WaterStateModel;
        })
      )
      .subscribe((water: WaterStateModel) => {
        this.store.dispatch(new LoadWater(water));
        this.store.dispatch(new AddWaterReport(water.waterReport));
        this.store.dispatch(new AddGrainBill(water.grainBill));
        this.store.dispatch(new AddWaterAdjustment(water.waterAdjustment));
      });
  }
}
