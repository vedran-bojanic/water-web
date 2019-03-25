import { Component, OnInit } from '@angular/core';
import { WaterService } from '../../water/services/water.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WaterStateModel } from '../../state/water-state.model';
import { Store } from '@ngxs/store';
import { AddBeerStyle, AddGrainBill, AddWaterAdjustment, AddWaterReport } from '../../state/water.actions';

@Component({
  selector: 'app-root-page',
  templateUrl: './root-page.component.html'
})
export class RootPageComponent implements OnInit {

  private ngUnsubscribe: Subject<any>;
  waters: WaterStateModel[];
  selectedWater: WaterStateModel;

  constructor(private store: Store, private waterService: WaterService) {
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit() {
    this.waterService.getAllWaters()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((waters) => this.waters = waters);
  }

  onWaterChange() {
    this.waterService.loadBeer(this.selectedWater.id)
      .subscribe((water: WaterStateModel) => {
        this.store.dispatch(new AddWaterReport(water.waterReport));
        this.store.dispatch(new AddGrainBill(water.grainBill));
        this.store.dispatch(new AddWaterAdjustment(water.waterAdjustment));
        this.store.dispatch(new AddBeerStyle(water.beerStyle));
      });
  }
}
