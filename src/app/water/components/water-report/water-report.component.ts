import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddWaterReport } from './states/water-report.action';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WaterReport } from '../../../state/water.interfaces';

@Component({
  selector: 'app-water',
  templateUrl: './water-report.component.html'
})
export class WaterReportComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any>;
  waterReportForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private store: Store) {
    this.ngUnsubscribe = new Subject();
    this.createForm();
  }

  ngOnInit() {
    this.store.selectOnce(state => state.waterReport)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((wr: WaterReport) => {
        this.waterReportForm.controls['calcium'].setValue(wr.calcium);
        this.waterReportForm.controls['magnesium'].setValue(wr.magnesium);
        this.waterReportForm.controls['sodium'].setValue(wr.sodium);
        this.waterReportForm.controls['chloride'].setValue(wr.chloride);
        this.waterReportForm.controls['sulfate'].setValue(wr.sulfate);
        this.waterReportForm.controls['alkalinity'].setValue(wr.alkalinity);
        this.waterReportForm.controls['mashVolume'].setValue(wr.mashVolume);
        this.waterReportForm.controls['spargeVolume'].setValue(wr.spargeVolume);
        this.waterReportForm.controls['mashRoPercentage'].setValue(wr.mashRoPercentage);
        this.waterReportForm.controls['spargeRoPercentage'].setValue(wr.spargeRoPercentage);
      });
  }

  onSubmit() {
    this.storeWaterReport();
  }

  onNext() {
    this.storeWaterReport();
    this.router.navigate(['/water/grain-bill']);
  }

  onBack() {
    this.storeWaterReport();
    this.router.navigate(['/']);
  }

  private createForm() {
    this.waterReportForm = this.fb.group({
      calcium: ['', Validators.required],
      magnesium: ['', Validators.required],
      sodium: ['', Validators.required],
      chloride: ['', Validators.required],
      sulfate: ['', Validators.required],
      alkalinity: ['', Validators.required],
      mashVolume: ['', Validators.required],
      spargeVolume: ['', Validators.required],
      mashRoPercentage: ['', Validators.required],
      spargeRoPercentage: ['', Validators.required]
    });
  }

  private storeWaterReport() {
    const waterReport: WaterReport = {
      calcium: this.waterReportForm.controls['calcium'].value,
      magnesium: this.waterReportForm.controls['magnesium'].value,
      sodium: this.waterReportForm.controls['sodium'].value,
      chloride: this.waterReportForm.controls['chloride'].value,
      sulfate: this.waterReportForm.controls['sulfate'].value,
      alkalinity: this.waterReportForm.controls['alkalinity'].value,
      mashVolume: this.waterReportForm.controls['mashVolume'].value,
      spargeVolume: this.waterReportForm.controls['spargeVolume'].value,
      mashRoPercentage: this.waterReportForm.controls['mashRoPercentage'].value,
      spargeRoPercentage: this.waterReportForm.controls['spargeRoPercentage'].value
    };
    this.store.dispatch(new AddWaterReport(waterReport));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
