import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AcidMalt, DecreasePh, IncreasePh, WaterAdjustment } from '../../../state/water.interfaces';
import { AddWaterAdjustment } from '../../../state/water.actions';

@Component({
  selector: 'app-water-adjustment',
  templateUrl: './water-adjustment.component.html'
})
export class WaterAdjustmentComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any>;
  waterAdjustmentForm: FormGroup;
  gypsum = true;
  calciumChloride = true;
  epsomSalt = true;
  slakedLime = true;
  bakingSoda = true;
  chalk = true;

  constructor(private router: Router, private fb: FormBuilder, private store: Store) {
    this.ngUnsubscribe = new Subject();
    this.createForm();
  }

  ngOnInit() {
    this.refreshData();
  }

  onChange() {
    this.storeWaterAdjustment();
    this.storeWaterAdjustment(); // should be refactored
    this.refreshData();
  }

  onNext() {
    this.storeWaterAdjustment();
    this.router.navigate(['/water/adjustment-summary']);
  }

  onBack() {
    this.storeWaterAdjustment();
    this.router.navigate(['/water/grain-bill']);
  }

  private refreshData() {
    this.store.selectOnce(state => state.water.waterAdjustment)
      .pipe(takeUntil(this.ngUnsubscribe))
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

        this.setFormValue('decreaseSaltsShowInput', 'showGypsum', wa.decreasePhSaltsSparge.showGypsum);
        this.gypsum = !wa.decreasePhSaltsSparge.showGypsum;
        this.setFormValue('decreaseSaltsShowInput', 'showCalciumChloride', wa.decreasePhSaltsSparge.showCalciumChloride);
        this.calciumChloride = !wa.decreasePhSaltsSparge.showCalciumChloride;
        this.setFormValue('decreaseSaltsShowInput', 'showEpsomSalt', wa.decreasePhSaltsSparge.showEpsomSalt);
        this.epsomSalt = !wa.decreasePhSaltsSparge.showEpsomSalt;
        this.setFormValue('increaseSaltsShowInput', 'showSlakedLime', wa.increasePhSaltsSparge.showSlakedLime);
        this.slakedLime = !wa.increasePhSaltsSparge.slakedLime;
        this.setFormValue('increaseSaltsShowInput', 'showBakingSoda', wa.increasePhSaltsSparge.showBakingSoda);
        this.bakingSoda = !wa.increasePhSaltsSparge.showBakingSoda;
        this.setFormValue('increaseSaltsShowInput', 'showChalk', wa.increasePhSaltsSparge.showChalk);
        this.chalk = !wa.increasePhSaltsSparge.showChalk;
      });
  }

  private createForm() {
    this.waterAdjustmentForm = this.fb.group({
      decreasePhSaltsMash: this.fb.group({
        gypsum: [],
        calciumChloride: [],
        epsomSalt: []
      }),
      decreaseSaltsShowInput: this.fb.group({
        showGypsum: [false],
        showCalciumChloride: [false],
        showEpsomSalt: [false]
      }),
      decreasePhSaltsSparge: this.fb.group({
        gypsum: [],
        calciumChloride: [],
        epsomSalt: []
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
      increaseSaltsShowInput: this.fb.group({
        showSlakedLime: [false],
        showBakingSoda: [false],
        showChalk: [false]
      }),
      increasePhSaltsSparge: this.fb.group({
        slakedLime: [''],
        bakingSoda: [''],
        chalk: ['']
      })
    });
  }

  private setFormValue(formGroupName: string, formControlName: string, value: any): any {
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
      showGypsum: this.getFormValue('decreaseSaltsShowInput', 'showGypsum').value,
      showCalciumChloride: this.getFormValue('decreaseSaltsShowInput', 'showCalciumChloride').value,
      showEpsomSalt: this.getFormValue('decreaseSaltsShowInput', 'showEpsomSalt').value,
    };
    const decreasePhSaltsSparge: DecreasePh = {
      gypsum: this.getFormValue('decreasePhSaltsSparge', 'gypsum').value,
      calciumChloride: this.getFormValue('decreasePhSaltsSparge', 'calciumChloride').value,
      epsomSalt: this.getFormValue('decreasePhSaltsSparge', 'epsomSalt').value,
      showGypsum: this.getFormValue('decreaseSaltsShowInput', 'showGypsum').value,
      showCalciumChloride: this.getFormValue('decreaseSaltsShowInput', 'showCalciumChloride').value,
      showEpsomSalt: this.getFormValue('decreaseSaltsShowInput', 'showEpsomSalt').value,
    };
    const increasePhSaltsMash: IncreasePh = {
      slakedLime: this.getFormValue('increasePhSaltsMash', 'slakedLime').value,
      bakingSoda: this.getFormValue('increasePhSaltsMash', 'bakingSoda').value,
      chalk: this.getFormValue('increasePhSaltsMash', 'chalk').value,
      showSlakedLime: this.getFormValue('increaseSaltsShowInput', 'showSlakedLime').value,
      showBakingSoda: this.getFormValue('increaseSaltsShowInput', 'showBakingSoda').value,
      showChalk: this.getFormValue('increaseSaltsShowInput', 'showChalk').value
    };
    const increasePhSaltsSparge: IncreasePh = {
      bakingSoda: this.getFormValue('increasePhSaltsSparge', 'bakingSoda').value,
      slakedLime: this.getFormValue('increasePhSaltsSparge', 'slakedLime').value,
      chalk: this.getFormValue('increasePhSaltsSparge', 'chalk').value,
      showSlakedLime: this.getFormValue('increaseSaltsShowInput', 'showSlakedLime').value,
      showBakingSoda: this.getFormValue('increaseSaltsShowInput', 'showBakingSoda').value,
      showChalk: this.getFormValue('increaseSaltsShowInput', 'showChalk').value
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
