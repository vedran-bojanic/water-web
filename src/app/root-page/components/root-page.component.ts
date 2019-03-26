import { Component, OnInit } from '@angular/core';
import { WaterService } from '../../water/services/water.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WaterStateModel } from '../../state/water-state.model';
import { Store } from '@ngxs/store';
import {
  AddBeerStyle,
  AddGrainBill,
  AddWaterAdjustment,
  AddWaterName,
  AddWaterReport,
  LoadWater
} from '../../state/water.actions';
import { WaterModel } from '../../water/models/water-model';
import { Router } from '@angular/router';

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
    this.router.navigate(['/water/water-report']);
  }

  onDelete() {
    this.waterService.deleteAllWater().subscribe();
  }

  onWaterChange() {
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
        this.store.dispatch(new LoadWater(water.id, water.name));
        this.store.dispatch(new AddWaterName(water.name));
        this.store.dispatch(new AddBeerStyle(water.beerStyle));
        this.store.dispatch(new AddWaterReport(water.waterReport));
        this.store.dispatch(new AddGrainBill(water.grainBill));
        this.store.dispatch(new AddWaterAdjustment(water.waterAdjustment));
      });
  }
}
