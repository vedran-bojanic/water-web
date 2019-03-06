import { Component, OnInit } from '@angular/core';
import { GrainService } from '../../services/grain.service';
import { Router } from '@angular/router';
import { MultiplyElementPipe } from '../../../shared/pipes/multiply-element.pipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Grain } from '../models/grain.model';
import { AddGrainBill } from './states/grain-bill.action';
import { GrainBill } from '../models/grain-bill.model';
import { GrainDropdown } from '../models/grain-dropdown.model';

@Component({
  selector: 'app-grain-bill',
  templateUrl: './grain-bill.component.html',
  providers: [ MultiplyElementPipe ]
})
export class GrainBillComponent implements OnInit {
  nums = 8;
  grainsDropdown: any[];
  grain: Grain;

  grainBillForm: FormGroup;

  constructor(
    private grainService: GrainService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.grainsDropdown = this.grainService.getDropdownGrains();
    this.store.select(state => state.grainBill.grains)
      .subscribe((grains: Grain[]) => {
        grains.forEach(grain => {
          this.setFormValue(grain.id, 'id', grain.id);
          this.setFormValue(grain.id, 'grainDropdown', grain.grainDropdown);
          this.setFormValue(grain.id, 'name', grain.name);
          this.setFormValue(grain.id, 'weight', grain.weight);
          this.setFormValue(grain.id, 'color', grain.color);
          grain.grainDropdown.name !== 'CRYSTAL' ?
            this.setFormValue(grain.id, 'pH', grain.grainDropdown.pH) :
            this.setFormValue(grain.id, 'pH', grain.crystalPh);
        });
      });
    // this.grains = this.grainService.getGrains();
  }

  onChange(grain: GrainDropdown, grainRowId: number) {
    if (grain) {
      this.setFormValue(grainRowId, 'pH', grain.pH);
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

  getGrainControl(i: number) {
    return this.grainBillForm.get('grain' + i + '.' + 'grainDropdown').value;
  }

  private setFormValue(grainId: number, formControlName: string, value: any): any {
    return this.grainBillForm.get('grain' + grainId + '.' + formControlName).setValue(value);
  }

  private createForm() {
    this.grainBillForm = this.fb.group({
      grain1: this.fb.group({
        id: [''],
        grainDropdown: [''],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain2: this.fb.group({
        id: [''],
        grainDropdown: [''],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain3: this.fb.group({
        id: [''],
        grainDropdown: [''],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain4: this.fb.group({
        id: [''],
        grainDropdown: [''],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain5: this.fb.group({
        id: [''],
        grainDropdown: [''],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain6: this.fb.group({
        id: [''],
        grainDropdown: [''],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain7: this.fb.group({
        id: [''],
        grainDropdown: [''],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      }),
      grain8: this.fb.group({
        id: [''],
        grainDropdown: [''],
        name: [''],
        weight: [''],
        color: [''],
        pH: ['']
      })
    });
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
          crystalPh: this.grainBillForm.get('grain1.grainDropdown').value.name === 'CRYSTAL' ?
            this.grainBillForm.get('grain1.pH').value : ''
        },
        {
          id: 2,
          name: this.grainBillForm.get('grain2.name').value,
          weight: this.grainBillForm.get('grain2.weight').value,
          color: this.grainBillForm.get('grain2.color').value,
          grainDropdown: this.grainBillForm.get('grain2.grainDropdown').value,
          crystalPh: this.grainBillForm.get('grain2.grainDropdown').value.name === 'CRYSTAL' ?
            this.grainBillForm.get('grain2.pH').value : ''
        },
        {
          id: 3,
          name: this.grainBillForm.get('grain3.name').value,
          weight: this.grainBillForm.get('grain3.weight').value,
          color: this.grainBillForm.get('grain3.color').value,
          grainDropdown: this.grainBillForm.get('grain3.grainDropdown').value,
          crystalPh: this.grainBillForm.get('grain3.grainDropdown').value.name === 'CRYSTAL' ?
            this.grainBillForm.get('grain3.pH').value : ''
        },
        {
          id: 4,
          name: this.grainBillForm.get('grain4.name').value,
          weight: this.grainBillForm.get('grain4.weight').value,
          color: this.grainBillForm.get('grain4.color').value,
          grainDropdown: this.grainBillForm.get('grain4.grainDropdown').value,
          crystalPh: this.grainBillForm.get('grain4.grainDropdown').value.name === 'CRYSTAL' ?
            this.grainBillForm.get('grain4.pH').value : ''
        },
        {
          id: 5,
          name: this.grainBillForm.get('grain5.name').value,
          weight: this.grainBillForm.get('grain5.weight').value,
          color: this.grainBillForm.get('grain5.color').value,
          grainDropdown: this.grainBillForm.get('grain5.grainDropdown').value,
          crystalPh: this.grainBillForm.get('grain5.grainDropdown').value.name === 'CRYSTAL' ?
            this.grainBillForm.get('grain5.pH').value : ''
        },
        {
          id: 6,
          name: this.grainBillForm.get('grain6.name').value,
          weight: this.grainBillForm.get('grain6.weight').value,
          color: this.grainBillForm.get('grain6.color').value,
          grainDropdown: this.grainBillForm.get('grain6.grainDropdown').value,
          crystalPh: this.grainBillForm.get('grain6.grainDropdown').value.name === 'CRYSTAL' ?
            this.grainBillForm.get('grain6.pH').value : ''
        },
        {
          id: 7,
          name: this.grainBillForm.get('grain7.name').value,
          weight: this.grainBillForm.get('grain7.weight').value,
          color: this.grainBillForm.get('grain7.color').value,
          grainDropdown: this.grainBillForm.get('grain7.grainDropdown').value,
          crystalPh: this.grainBillForm.get('grain7.grainDropdown').value.name === 'CRYSTAL' ?
            this.grainBillForm.get('grain7.pH').value : ''
        },
        {
          id: 8,
          name: this.grainBillForm.get('grain8.name').value,
          weight: this.grainBillForm.get('grain8.weight').value,
          color: this.grainBillForm.get('grain8.color').value,
          grainDropdown: this.grainBillForm.get('grain8.grainDropdown').value,
          crystalPh: this.grainBillForm.get('grain8.grainDropdown').value.name === 'CRYSTAL' ?
            this.grainBillForm.get('grain8.pH').value : ''
        }
      ]
    };
    this.store.dispatch(new AddGrainBill(grainBill));
  }
}

