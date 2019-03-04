import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SetWaterReport, WaterReportModel } from './states/water-report.action';

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
      .subscribe((x: WaterReportModel) => {
        this.waterReportForm.controls['calcium'].setValue(x.calcium);
        this.waterReportForm.controls['magnesium'].setValue(x.magnesium);
        this.waterReportForm.controls['sodium'].setValue(x.sodium);
        this.waterReportForm.controls['chloride'].setValue(x.chloride);
        this.waterReportForm.controls['sulfate'].setValue(x.sulfate);
        this.waterReportForm.controls['alkalinity'].setValue(x.alkalinity);
        this.waterReportForm.controls['mashVolume'].setValue(x.mashVolume);
        this.waterReportForm.controls['spargeVolume'].setValue(x.spargeVolume);
        this.waterReportForm.controls['mashRoPercentage'].setValue(x.mashRoPercentage);
        this.waterReportForm.controls['spargeRoPercentage'].setValue(x.spargeRoPercentage);
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
    this.store.dispatch(new SetWaterReport(
      this.waterReportForm.controls['calcium'].value,
      this.waterReportForm.controls['magnesium'].value,
      this.waterReportForm.controls['sodium'].value,
      this.waterReportForm.controls['chloride'].value,
      this.waterReportForm.controls['sulfate'].value,
      this.waterReportForm.controls['alkalinity'].value,
      this.waterReportForm.controls['mashVolume'].value,
      this.waterReportForm.controls['spargeVolume'].value,
      this.waterReportForm.controls['mashRoPercentage'].value,
      this.waterReportForm.controls['spargeRoPercentage'].value
    ));
  }
}
