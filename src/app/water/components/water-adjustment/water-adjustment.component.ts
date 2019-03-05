import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DecreasePh } from '../models/decrease-ph.model';
import { IncreasePh } from '../models/increase-ph.model';
import { AcidMalt } from '../models/acid-malt.model';
import { WaterAdjustment } from '../models/water-adjustment.model';
import { AddWaterAdjustment } from './states/water-adjustment.actions';

@Component({
  selector: 'app-water-adjustment',
  templateUrl: './water-adjustment.component.html'
})
export class WaterAdjustmentComponent implements OnInit {

  waterAdjustmentForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private store: Store) {
    this.createForm();
  }

  ngOnInit() {
    this.store.selectOnce(state => state.waterAdjustment)
      .subscribe((wa: WaterAdjustment) => {
        this.setFormValue('decreasePhSaltsMash', 'gypsum', wa.decreasePhSaltsMash.gypsum);
        this.setFormValue('decreasePhSaltsMash', 'calciumChloride', wa.decreasePhSaltsMash.calciumChloride);
        this.setFormValue('decreasePhSaltsMash', 'epsomSalt', wa.decreasePhSaltsMash.epsomSalt);
        this.setFormValue('decreasePhSaltsSparge', 'gypsum', wa.decreasePhSaltsSparge.gypsum);
        this.setFormValue('decreasePhSaltsSparge', 'calciumChloride', wa.decreasePhSaltsSparge.calciumChloride);
        this.setFormValue('decreasePhSaltsSparge', 'epsomSalt', wa.decreasePhSaltsSparge.epsomSalt);
        this.setFormValue('decreasePhAcid', 'acidulatedMalt', wa.decreasePhAcid.acidulatedMalt);
        this.setFormValue('decreasePhAcid', 'lacticAcid', wa.decreasePhAcid.lacticAcid);
        this.setFormValue('increasePhSaltsMash', 'slakedLime', wa.increasePhSaltsMash.slakedLime);
        this.setFormValue('increasePhSaltsMash', 'bakingSoda', wa.increasePhSaltsMash.bakingSoda);
        this.setFormValue('increasePhSaltsMash', 'chalk', wa.increasePhSaltsMash.chalk);
        this.setFormValue('increasePhSaltsSparge', 'slakedLime', wa.increasePhSaltsSparge.slakedLime);
        this.setFormValue('increasePhSaltsSparge', 'bakingSoda', wa.increasePhSaltsSparge.bakingSoda);
        this.setFormValue('increasePhSaltsSparge', 'chalk', wa.increasePhSaltsSparge.chalk);
      });
  }

  onSubmit() {
    this.storeWaterAdjustment();
  }

  onNext() {
    this.storeWaterAdjustment();
    this.router.navigate(['/water/adjustment-summary']);
  }

  onBack() {
    this.storeWaterAdjustment();
    this.router.navigate(['/water/grain-bill']);
  }

  private createForm() {
    this.waterAdjustmentForm = this.fb.group({
      decreasePhSaltsMash: this.fb.group({
        gypsum: [''],
        calciumChloride: [''],
        epsomSalt: ['']
      }),
      decreasePhSaltsSparge: this.fb.group({
        gypsum: [''],
        calciumChloride: [''],
        epsomSalt: ['']
      }),
      decreasePhAcid: this.fb.group({
        acidulatedMalt: [''],
        lacticAcid: ['']
      }),
      increasePhSaltsMash: this.fb.group({
        slakedLime: [''],
        bakingSoda: [''],
        chalk: ['']
      }),
      increasePhSaltsSparge: this.fb.group({
        slakedLime: [''],
        bakingSoda: [''],
        chalk: ['']
      })
    });
  }

  private setFormValue(formGroupName: string, formControlName: string, value: number): any {
    return this.waterAdjustmentForm.get(formGroupName + '.' + formControlName).setValue(value);
  }

  private getFormValue(formGroupName: string, formControlName: string): any {
    return this.waterAdjustmentForm.get(formGroupName + '.' + formControlName);
  }

  private storeWaterAdjustment() {
    const decreasePhSaltsMash: DecreasePh = {
      gypsum: this.getFormValue('decreasePhSaltsMash', 'gypsum').value,
      calciumChloride: this.getFormValue('decreasePhSaltsMash', 'calciumChloride').value,
      epsomSalt: this.getFormValue('decreasePhSaltsMash', 'epsomSalt').value,
    };
    const decreasePhSaltsSparge: DecreasePh = {
      gypsum: this.getFormValue('decreasePhSaltsSparge', 'gypsum').value,
      calciumChloride: this.getFormValue('decreasePhSaltsSparge', 'calciumChloride').value,
      epsomSalt: this.getFormValue('decreasePhSaltsSparge', 'epsomSalt').value,
    };
    const increasePhSaltsMash: IncreasePh = {
      slakedLime: this.getFormValue('increasePhSaltsMash', 'slakedLime').value,
      bakingSoda: this.getFormValue('increasePhSaltsMash', 'bakingSoda').value,
      chalk: this.getFormValue('increasePhSaltsMash', 'chalk').value,
    };
    const increasePhSaltsSparge: IncreasePh = {
      bakingSoda: this.getFormValue('increasePhSaltsSparge', 'bakingSoda').value,
      slakedLime: this.getFormValue('increasePhSaltsSparge', 'slakedLime').value,
      chalk: this.getFormValue('increasePhSaltsSparge', 'chalk').value,
    };
    const decreasePhAcid: AcidMalt = {
      acidulatedMalt: this.getFormValue('decreasePhAcid', 'acidulatedMalt').value,
      lacticAcid: this.getFormValue('decreasePhAcid', 'lacticAcid').value,
    };
    const waterAdjustment: WaterAdjustment = {
      decreasePhSaltsMash: decreasePhSaltsMash,
      decreasePhSaltsSparge: decreasePhSaltsSparge,
      decreasePhAcid: decreasePhAcid,
      increasePhSaltsMash: increasePhSaltsMash,
      increasePhSaltsSparge: increasePhSaltsSparge,
    };
    this.store.dispatch(new AddWaterAdjustment(waterAdjustment));
  }
}
