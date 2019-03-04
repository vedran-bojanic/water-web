import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { WaterReport } from '../models/water.report.model';
import { SetWaterReport } from './states/water-report.action';

@Component({
  selector: 'app-water',
  templateUrl: './water-report.component.html'
})
export class WaterReportComponent implements OnInit {

  waterReportForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private store: Store) {
    this.createForm();
  }

  ngOnInit() {
    this.store.selectOnce(state => state.waterReport)
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

  createForm() {
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

  onSubmit() {
    this.storeWaterReport();
  }

  onNext() {
    this.storeWaterReport();
    this.router.navigate(['/water/grain-bill']);
  }

  onBack() {
    this.router.navigate(['/']);
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
    this.store.dispatch(new SetWaterReport(waterReport));
  }
}
