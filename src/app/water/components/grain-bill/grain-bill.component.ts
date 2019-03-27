import { Component, OnDestroy, OnInit } from '@angular/core';
import { GrainService } from '../../services/grain.service';
import { Router } from '@angular/router';
import { MultiplyElementPipe } from '../../../shared/pipes/multiply-element.pipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Grain, GrainBill, GrainType } from '../../../state/water.interfaces';
import { AddGrainBill } from '../../../state/water.actions';

@Component({
  selector: 'app-grain-bill',
  templateUrl: './grain-bill.component.html',
  providers: [ MultiplyElementPipe ]
})
export class GrainBillComponent implements OnInit, OnDestroy {
  nums = 8;
  grainTypes: GrainType[];
  grain: Grain;

  private ngUnsubscribe: Subject<any>;
  grainBillForm: FormGroup;

  constructor(
    private grainService: GrainService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.ngUnsubscribe = new Subject();
    this.createForm();
  }

  ngOnInit() {
    this.grainService.getGrainTypes()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((grainTypes) => this.grainTypes = grainTypes);
    this.refreshData();
  }

  onChange(grain: GrainType, grainRowId: number) {
    if (grain) {
      this.setFormValue(grainRowId, 'pH', grain.pH);

      if (grain.name === 'CRYSTAL') {
        const defaultCrystalPh = 5.22;
        this.setFormValue(grainRowId, 'pH', defaultCrystalPh);
      }
    } else {
      this.grainBillForm.controls['grain' + grainRowId].reset();
    }
    this.storeGrainBill();
  }

  onInput() {
    this.storeGrainBill();
  }

  onNext() {
    this.storeGrainBill();
    this.router.navigate(['/water/water-adjustment']);
  }

  onBack() {
    this.storeGrainBill();
    this.router.navigate(['/water/water-report']);
  }

  getGrainControl(grainId: number) {
    if (this.grainBillForm.get('grain' + grainId + '.' + 'grainType').value) {
      return this.grainBillForm.get('grain' + grainId + '.' + 'grainType').value.name;
    }
  }

  calculatePh(grainRowId: number) {
    const grainColor = this.grainBillForm.get('grain' + grainRowId + '.color').value;
    const crystalPH = 5.22 - 0.00504 * grainColor;
    this.setFormValue(grainRowId, 'pH', Math.round(crystalPH * 100) / 100);
  }

  private setFormValue(grainId: number, formControlName: string, value: any): any {
    return this.grainBillForm.get('grain' + grainId + '.' + formControlName).setValue(value);
  }

  private getFormValue(grainId: number, formControlName: string): any {
    return this.grainBillForm.get('grain' + grainId + '.' + formControlName);
  }

  private refreshData() {
    this.store.selectOnce(state => state.water.grainBill)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((grainBill: GrainBill) => {
        grainBill.grains.forEach(
          grain => {
            this.setFormValue(grain.grainPosition, 'grainPosition', grain.grainPosition);
            this.setFormValue(grain.grainPosition, 'grainType', grain.grainType);
            this.setFormValue(grain.grainPosition, 'name', grain.name);
            this.setFormValue(grain.grainPosition, 'weight', grain.weight ? grain.weight : '');
            this.setFormValue(grain.grainPosition, 'color', grain.color);
            if (grain.grainType) {
              grain.grainType.name !== 'CRYSTAL' ?
                this.setFormValue(grain.grainPosition, 'pH', grain.grainType.pH) :
                this.setFormValue(grain.grainPosition, 'pH', grain.crystalPh);
            }
          }
        );
        this.grainBillForm.get('totalGrainWeight').setValue(grainBill.totalGrainWeight);
        this.grainBillForm.get('mashThickness').setValue(grainBill.mashThickness.toFixed(2));
      });
  }

  private createForm() {
    this.grainBillForm = this.fb.group({
      grain1: this.fb.group({
        grainPosition: [1],
        grainType: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain2: this.fb.group({
        grainPosition: [2],
        grainType: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain3: this.fb.group({
        grainPosition: [3],
        grainType: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain4: this.fb.group({
        grainPosition: [4],
        grainType: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain5: this.fb.group({
        grainPosition: [5],
        grainType: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain6: this.fb.group({
        grainPosition: [6],
        grainType: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain7: this.fb.group({
        grainPosition: [7],
        grainType: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain8: this.fb.group({
        grainPosition: [8],
        grainType: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      mashThickness: [''],
      totalGrainWeight: ['']
    });
  }

  private crystalPh(grainId: number): any {
    if (this.grainBillForm.get('grain' + grainId + '.grainType').value) {
      return this.grainBillForm.get('grain' + grainId + '.grainType').value.name === 'CRYSTAL' ?
        this.grainBillForm.get('grain' + grainId + '.pH').value :
        '';
    }
  }

  private storeGrainBill() {
    const grainBill: GrainBill = {
      grains: [
        {
          grainPosition: 1,
          name: this.grainBillForm.get('grain1.name').value,
          weight: this.grainBillForm.get('grain1.weight').value,
          color: this.grainBillForm.get('grain1.color').value,
          grainTypeId: this.grainBillForm.get('grain1.grainType').value != null ?
            this.grainBillForm.get('grain1.grainType').value.id :
            null,
          grainType: this.grainBillForm.get('grain1.grainType').value,
          crystalPh: this.crystalPh(1)
        },
        {
          grainPosition: 2,
          name: this.grainBillForm.get('grain2.name').value,
          weight: this.grainBillForm.get('grain2.weight').value,
          color: this.grainBillForm.get('grain2.color').value,
          grainTypeId: this.grainBillForm.get('grain2.grainType').value != null ?
            this.grainBillForm.get('grain2.grainType').value.id :
            null,
          grainType: this.grainBillForm.get('grain2.grainType').value,
          crystalPh: this.crystalPh(2)
        },
        {
          grainPosition: 3,
          name: this.grainBillForm.get('grain3.name').value,
          weight: this.grainBillForm.get('grain3.weight').value,
          color: this.grainBillForm.get('grain3.color').value,
          grainTypeId: this.grainBillForm.get('grain3.grainType').value != null ?
            this.grainBillForm.get('grain3.grainType').value.id :
            null,
          grainType: this.grainBillForm.get('grain3.grainType').value,
          crystalPh: this.crystalPh(3)
        },
        {
          grainPosition: 4,
          name: this.grainBillForm.get('grain4.name').value,
          weight: this.grainBillForm.get('grain4.weight').value,
          color: this.grainBillForm.get('grain4.color').value,
          grainTypeId: this.grainBillForm.get('grain4.grainType').value != null ?
            this.grainBillForm.get('grain4.grainType').value.id :
            null,
          grainType: this.grainBillForm.get('grain4.grainType').value,
          crystalPh: this.crystalPh(4)
        },
        {
          grainPosition: 5,
          name: this.grainBillForm.get('grain5.name').value,
          weight: this.grainBillForm.get('grain5.weight').value,
          color: this.grainBillForm.get('grain5.color').value,
          grainTypeId: this.grainBillForm.get('grain5.grainType').value != null ?
            this.grainBillForm.get('grain5.grainType').value.id :
            null,
          grainType: this.grainBillForm.get('grain5.grainType').value,
          crystalPh: this.crystalPh(5)
        },
        {
          grainPosition: 6,
          name: this.grainBillForm.get('grain6.name').value,
          weight: this.grainBillForm.get('grain6.weight').value,
          color: this.grainBillForm.get('grain6.color').value,
          grainTypeId: this.grainBillForm.get('grain6.grainType').value != null ?
            this.grainBillForm.get('grain6.grainType').value.id :
            null,
          grainType: this.grainBillForm.get('grain6.grainType').value,
          crystalPh: this.crystalPh(6)
        },
        {
          grainPosition: 7,
          name: this.grainBillForm.get('grain7.name').value,
          weight: this.grainBillForm.get('grain7.weight').value,
          color: this.grainBillForm.get('grain7.color').value,
          grainTypeId: this.grainBillForm.get('grain7.grainType').value != null ?
            this.grainBillForm.get('grain7.grainType').value.id :
            null,
          grainType: this.grainBillForm.get('grain7.grainType').value,
          crystalPh: this.crystalPh(7)
        },
        {
          grainPosition: 8,
          name: this.grainBillForm.get('grain8.name').value,
          weight: this.grainBillForm.get('grain8.weight').value,
          color: this.grainBillForm.get('grain8.color').value,
          grainTypeId: this.grainBillForm.get('grain8.grainType').value != null ?
            this.grainBillForm.get('grain8.grainType').value.id :
            null,
          grainType: this.grainBillForm.get('grain8.grainType').value,
          crystalPh: this.crystalPh(8)
        }
      ],
      totalGrainWeight: this.grainBillForm.get('totalGrainWeight').value,
      mashThickness: this.grainBillForm.get('mashThickness').value
    };
    this.store.dispatch(new AddGrainBill(grainBill));
    this.refreshData();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

