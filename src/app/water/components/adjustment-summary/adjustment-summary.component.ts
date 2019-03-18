import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdjustmentSummary } from '../../../state/water.interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adjustment-summary',
  templateUrl: './adjustment-summary.component.html'
})
export class AdjustmentSummaryComponent implements OnInit {

  private ngUnsubscribe: Subject<any>;
  mashWaterForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private store: Store) {
    this.ngUnsubscribe = new Subject();
    this.createForm();
  }

  ngOnInit() {
    this.store.select(state => state.water.adjustmentSummary)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((as: AdjustmentSummary) => {
        console.log('AdjustmentSummary', as);
        this.setFormValue('mashWater', 'calcium', as.mashWater.calcium);
        this.setFormValue('mashWater', 'magnesium', as.mashWater.magnesium);
        this.setFormValue('mashWater', 'sodium', as.mashWater.sodium);
        this.setFormValue('mashWater', 'chloride', as.mashWater.chloride);
        this.setFormValue('mashWater', 'sulfate', as.mashWater.sulfate);
        this.setFormValue('ratio', 'mash', as.mashWater.chlorideToSulfateRatio);
        this.setFormValue('overallWater', 'calcium', as.overallWater.calcium);
        this.setFormValue('overallWater', 'magnesium', as.overallWater.magnesium);
        this.setFormValue('overallWater', 'sodium', as.overallWater.sodium);
        this.setFormValue('overallWater', 'chloride', as.overallWater.chloride);
        this.setFormValue('overallWater', 'sulfate', as.overallWater.sulfate);
        this.setFormValue('ratio', 'overall', as.overallWater.chlorideToSulfateRatio);
      });
  }

  createForm() {
    this.mashWaterForm = this.fb.group({
      mashWater: this.fb.group({
        calcium: [],
        magnesium: [],
        sodium: [],
        chloride: [],
        sulfate: []
      }),
      overallWater: this.fb.group({
        calcium: [],
        magnesium: [],
        sodium: [],
        chloride: [],
        sulfate: []
      }),
      ratio: this.fb.group({
        mash: [],
        overall: []
      })
    });
  }

  onBack() {
    this.router.navigate(['/water/water-adjustment']);
  }

  onSave() {
    alert('Water Saved!');
  }

  private setFormValue(formGroupName: string, formControlName: string, value: any): any {
    return this.mashWaterForm.get(formGroupName + '.' + formControlName).setValue(value);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
