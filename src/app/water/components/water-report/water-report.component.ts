import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BeerStyle, WaterReport } from '../../../state/water.interfaces';
import { AddBeerStyle, AddWaterReport } from '../../../state/water.actions';
import { WaterService } from '../../services/water.service';

@Component({
  selector: 'app-water',
  templateUrl: './water-report.component.html'
})
export class WaterReportComponent implements OnInit, OnDestroy {

  selectedBeerStyle: BeerStyle;
  beerStyles: BeerStyle[];

  private ngUnsubscribe: Subject<any>;
  waterReportForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private store: Store, private waterService: WaterService) {
    this.ngUnsubscribe = new Subject();
    this.createForm();
  }

  ngOnInit() {
    this.store.selectOnce(state => state.water.beerStyle)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((beerStyle: BeerStyle) => this.selectedBeerStyle = beerStyle);
    this.waterService.getBeerStyles()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((beerStyles) => this.beerStyles = beerStyles);
    this.refreshData();
  }

  onInput() {
    this.storeWaterReport();
  }

  onBeerStyleChange() {
    this.store.dispatch(new AddBeerStyle(this.selectedBeerStyle));
  }

  onNext() {
    this.storeWaterReport();
    this.router.navigate(['/water/grain-bill']);
  }

  onBack() {
    this.storeWaterReport();
    this.router.navigate(['/']);
  }

  private refreshData() {
    this.store.selectOnce(state => state.water.waterReport)
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

  private createForm() {
    this.waterReportForm = this.fb.group({
      calcium: [''],
      magnesium: [''],
      sodium: [''],
      chloride: [''],
      sulfate: [''],
      alkalinity: [''],
      mashVolume: [''],
      spargeVolume: [''],
      mashRoPercentage: [''],
      spargeRoPercentage: ['']
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
