import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdjustmentSummary, BeerStyle, Water } from '../../../state/water.interfaces';
import { WaterService } from '../../services/water.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddWaterName } from '../../../state/water.actions';

@Component({
  selector: 'app-adjustment-summary',
  templateUrl: './adjustment-summary.component.html'
})
export class AdjustmentSummaryComponent implements OnInit {

  private ngUnsubscribe: Subject<any>;
  mashWater: Water;
  overallWater: Water;
  selectedBeerStyle: BeerStyle;
  waterNameForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private store: Store, private waterService: WaterService) {
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit() {
    this.createForm();
    this.store.select(state => state.water.adjustmentSummary)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((as: AdjustmentSummary) => {
        this.mashWater = as.mashWater;
        this.overallWater = as.overallWater;
      });
    this.store.selectOnce(state => state.water.beerStyle)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((beerStyle: BeerStyle) => this.selectedBeerStyle = beerStyle);
  }

  onBack() {
    this.router.navigate(['/water/water-adjustment']);
  }

  onSave() {
    this.store.dispatch(new AddWaterName(this.waterNameForm.controls['waterName'].value))
    this.waterService.saveWater()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
    );
  }

  private createForm() {
    this.waterNameForm = this.fb.group({
      waterName: ['']
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
