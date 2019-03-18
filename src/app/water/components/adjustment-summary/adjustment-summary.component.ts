import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdjustmentSummary, Water } from '../../../state/water.interfaces';

@Component({
  selector: 'app-adjustment-summary',
  templateUrl: './adjustment-summary.component.html'
})
export class AdjustmentSummaryComponent implements OnInit {

  private ngUnsubscribe: Subject<any>;
  mashWater: Water;
  overallWater: Water;

  constructor(private router: Router, private store: Store) {
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit() {
    this.store.select(state => state.water.adjustmentSummary)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((as: AdjustmentSummary) => {
        this.mashWater = as.mashWater;
        this.overallWater = as.overallWater;
      });
  }

  onBack() {
    this.router.navigate(['/water/water-adjustment']);
  }

  onSave() {
    alert('Water Saved!');
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
