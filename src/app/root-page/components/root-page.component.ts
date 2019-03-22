import { Component, OnInit } from '@angular/core';
import { WaterService } from '../../water/services/water.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WaterStateModel } from '../../state/water-state.model';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root-page',
  templateUrl: './root-page.component.html'
})
export class RootPageComponent implements OnInit {

  private ngUnsubscribe: Subject<any>;
  waters: WaterStateModel[];
  selectedWater: WaterStateModel;

  constructor(private store: Store, private waterService: WaterService) { }

  ngOnInit() {
    this.waterService.getAllWaters()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((waters) => this.waters = waters);
  }

  onWaterChange() {
    this.store.dispatch(null);
  }

}
