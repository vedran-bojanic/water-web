import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdjustmentSummary, BeerStyle, Water } from '../../../state/water.interfaces';
import { WaterService } from '../../services/water.service';
import { AddBeerStyle } from '../../../state/water.actions';

@Component({
  selector: 'app-adjustment-summary',
  templateUrl: './adjustment-summary.component.html'
})
export class AdjustmentSummaryComponent implements OnInit {

  private ngUnsubscribe: Subject<any>;
  beerStyles: BeerStyle[];
  selectedBeerStyle: BeerStyle;
  mashWater: Water;
  overallWater: Water;

  constructor(private router: Router, private store: Store, private waterService: WaterService) {
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit() {
    this.store.selectOnce(state => state.water.beerStyle)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((beerStyle: BeerStyle) => this.selectedBeerStyle = beerStyle);

    this.store.select(state => state.water.adjustmentSummary)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((as: AdjustmentSummary) => {
        this.mashWater = as.mashWater;
        this.overallWater = as.overallWater;
      });

    this.waterService.getBeerStyles()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((beerStyles) => this.beerStyles = beerStyles);
  }

  onChange() {
    this.storeBeerStyle();
  }

  onBack() {
    this.storeBeerStyle();
    this.router.navigate(['/water/water-adjustment']);
  }

  storeBeerStyle() {
    this.store.dispatch(new AddBeerStyle(this.selectedBeerStyle));
  }

  onSave() {
    alert('Water Saved!');
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
