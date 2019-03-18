import { Component, OnDestroy, OnInit } from '@angular/core';
import { GrainService } from '../../services/grain.service';
import { Router } from '@angular/router';
import { MultiplyElementPipe } from '../../../shared/pipes/multiply-element.pipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Grain, GrainBill, GrainDropdown } from '../../../state/water.interfaces';
import { AddGrainBill } from '../../../state/water.actions';

@Component({
  selector: 'app-grain-bill',
  templateUrl: './grain-bill.component.html',
  providers: [ MultiplyElementPipe ]
})
export class GrainBillComponent implements OnInit, OnDestroy {
  nums = 8;
  grainsDropdown: Grain[];
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
    this.grainsDropdown = this.grainService.getDropdownGrains();
    this.refreshData();
  }

  onChange(grain: GrainDropdown, grainRowId: number) {
    if (grain) {
      this.setFormValue(grainRowId, 'pH', grain.pH);

        if (grain.name === 'CRYSTAL') {
          const defaultCrystalPh = 5.22;
          this.setFormValue(grainRowId, 'pH', defaultCrystalPh);
      }
    } else {
      this.grainBillForm.controls['grain' + grainRowId].reset();
    }
  }

  onSubmit() {
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
    if (this.grainBillForm.get('grain' + grainId + '.' + 'grainDropdown').value) {
      return this.grainBillForm.get('grain' + grainId + '.' + 'grainDropdown').value.name;
    }
  }

  calculatePh(grainRowId: number) {
    const grainColor = this.grainBillForm.get('grain' + grainRowId + '.color').value;
    const crystalPH = 5.22 - 0.00504 * grainColor;
    this.setFormValue(grainRowId, 'pH', crystalPH.toFixed(2));
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
            this.setFormValue(grain.id, 'id', grain.id);
            this.setFormValue(grain.id, 'grainDropdown', grain.grainDropdown);
            this.setFormValue(grain.id, 'name', grain.name);
            this.setFormValue(grain.id, 'weight', grain.weight ? grain.weight : '');
            this.setFormValue(grain.id, 'color', grain.color);
            if (grain.grainDropdown) {
              grain.grainDropdown.name !== 'CRYSTAL' ?
                this.setFormValue(grain.id, 'pH', grain.grainDropdown.pH) :
                this.setFormValue(grain.id, 'pH', grain.crystalPh);
            }
          }
        );
        this.grainBillForm.get('totalGrainWeight').setValue(grainBill.totalGrainWeight.toFixed(2));
        this.grainBillForm.get('mashThickness').setValue(grainBill.mashThickness.toFixed(2));
      });
  }

  private createForm() {
    this.grainBillForm = this.fb.group({
      grain1: this.fb.group({
        id: [''],
        grainDropdown: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain2: this.fb.group({
        id: [''],
        grainDropdown: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain3: this.fb.group({
        id: [''],
        grainDropdown: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain4: this.fb.group({
        id: [''],
        grainDropdown: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain5: this.fb.group({
        id: [''],
        grainDropdown: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain6: this.fb.group({
        id: [''],
        grainDropdown: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain7: this.fb.group({
        id: [''],
        grainDropdown: [null],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain8: this.fb.group({
        id: [''],
        grainDropdown: [null],
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
    if (this.grainBillForm.get('grain' + grainId + '.grainDropdown').value) {
      return this.grainBillForm.get('grain' + grainId + '.grainDropdown').value.name === 'CRYSTAL' ?
        this.grainBillForm.get('grain' + grainId + '.pH').value :
        '';
    }
  }

  private storeGrainBill() {
    const grainBill: GrainBill = {
      grains: [
        {
          id: 1,
          name: this.grainBillForm.get('grain1.name').value,
          weight: this.grainBillForm.get('grain1.weight').value,
          color: this.grainBillForm.get('grain1.color').value,
          grainDropdown: this.grainBillForm.get('grain1.grainDropdown').value,
          crystalPh: this.crystalPh(1)
        },
        {
          id: 2,
          name: this.grainBillForm.get('grain2.name').value,
          weight: this.grainBillForm.get('grain2.weight').value,
          color: this.grainBillForm.get('grain2.color').value,
          grainDropdown: this.grainBillForm.get('grain2.grainDropdown').value,
          crystalPh: this.crystalPh(2)
        },
        {
          id: 3,
          name: this.grainBillForm.get('grain3.name').value,
          weight: this.grainBillForm.get('grain3.weight').value,
          color: this.grainBillForm.get('grain3.color').value,
          grainDropdown: this.grainBillForm.get('grain3.grainDropdown').value,
          crystalPh: this.crystalPh(3)
        },
        {
          id: 4,
          name: this.grainBillForm.get('grain4.name').value,
          weight: this.grainBillForm.get('grain4.weight').value,
          color: this.grainBillForm.get('grain4.color').value,
          grainDropdown: this.grainBillForm.get('grain4.grainDropdown').value,
          crystalPh: this.crystalPh(4)
        },
        {
          id: 5,
          name: this.grainBillForm.get('grain5.name').value,
          weight: this.grainBillForm.get('grain5.weight').value,
          color: this.grainBillForm.get('grain5.color').value,
          grainDropdown: this.grainBillForm.get('grain5.grainDropdown').value,
          crystalPh: this.crystalPh(5)
        },
        {
          id: 6,
          name: this.grainBillForm.get('grain6.name').value,
          weight: this.grainBillForm.get('grain6.weight').value,
          color: this.grainBillForm.get('grain6.color').value,
          grainDropdown: this.grainBillForm.get('grain6.grainDropdown').value,
          crystalPh: this.crystalPh(6)
        },
        {
          id: 7,
          name: this.grainBillForm.get('grain7.name').value,
          weight: this.grainBillForm.get('grain7.weight').value,
          color: this.grainBillForm.get('grain7.color').value,
          grainDropdown: this.grainBillForm.get('grain7.grainDropdown').value,
          crystalPh: this.crystalPh(7)
        },
        {
          id: 8,
          name: this.grainBillForm.get('grain8.name').value,
          weight: this.grainBillForm.get('grain8.weight').value,
          color: this.grainBillForm.get('grain8.color').value,
          grainDropdown: this.grainBillForm.get('grain8.grainDropdown').value,
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

