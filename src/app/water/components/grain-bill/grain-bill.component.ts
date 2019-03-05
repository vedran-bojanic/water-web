import { Component, OnInit } from '@angular/core';
import { GrainService } from '../../services/grain.service';
import { Router } from '@angular/router';
import { MultiplyElementPipe } from '../../../shared/pipes/multiply-element.pipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Grain } from '../models/grain.model';
import { AddGrainBill } from './states/grain-bill.action';
import { GrainBill } from '../models/grain-bill.model';

@Component({
  selector: 'app-grain-bill',
  templateUrl: './grain-bill.component.html',
  providers: [ MultiplyElementPipe ]
})
export class GrainBillComponent implements OnInit {
  nums = 8;
  grainsDropdown: any[];
  selectedGrain: Grain;
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
          this.setFormValue(grain.id, 'name', grain.name);
          this.setFormValue(grain.id, 'weight', grain.weight);
          this.setFormValue(grain.id, 'color', grain.color);
        });
      });
    // this.grains = this.grainService.getGrains();
  }

  private setFormValue(grainId: number, formControlName: string, value: any): any {
    return this.grainBillForm.get('grain' + grainId + '.' + formControlName).setValue(value);
  }

  onChange(grain: Grain, grainRowId: number) {
    // this.selectedGrain = grain;
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

  private createForm() {
    this.grainBillForm = this.fb.group({
      grain1: this.fb.group({
        id: [''],
        grain: [''],
        name: [''],
        weight: [''],
        color: ['']
      }),
      grain2: this.fb.group({
        id: [''],
        grain: [''],
        name: [''],
        weight: [''],
        color: ['']
      }),
      grain3: this.fb.group({
        id: [''],
        grain: [''],
        name: [''],
        weight: [''],
        color: ['']
      }),
      grain4: this.fb.group({
        id: [''],
        grain: [''],
        name: [''],
        weight: [''],
        color: ['']
      }),
      grain5: this.fb.group({
        id: [''],
        grain: [''],
        name: [''],
        weight: [''],
        color: ['']
      }),
      grain6: this.fb.group({
        id: [''],
        grain: [''],
        name: [''],
        weight: [''],
        color: ['']
      }),
      grain7: this.fb.group({
        id: [''],
        grain: [''],
        name: [''],
        weight: [''],
        color: ['']
      }),
      grain8: this.fb.group({
        id: [''],
        grain: [''],
        name: [''],
        weight: [''],
        color: ['']
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
          pH: this.grainBillForm.get('grain1.grain').value.pH,
          grainTypeId: this.grainBillForm.get('grain1.grain').value.id,
          grainType: this.grainBillForm.get('grain1.grain').value.type
        },
        {
          id: 2,
          name: this.grainBillForm.get('grain2.name').value,
          weight: this.grainBillForm.get('grain2.weight').value,
          color: this.grainBillForm.get('grain2.color').value,
          pH: this.grainBillForm.get('grain2.grain').value.pH,
          grainTypeId: this.grainBillForm.get('grain2.grain').value.id,
          grainType: this.grainBillForm.get('grain2.grain').value.type
        },
        {
          id: 3,
          name: this.grainBillForm.get('grain3.name').value,
          weight: this.grainBillForm.get('grain3.weight').value,
          color: this.grainBillForm.get('grain3.color').value,
          pH: this.grainBillForm.get('grain3.grain').value.pH,
          grainTypeId: this.grainBillForm.get('grain3.grain').value.id,
          grainType: this.grainBillForm.get('grain3.grain').value.type
        },
        {
          id: 4,
          name: this.grainBillForm.get('grain4.name').value,
          weight: this.grainBillForm.get('grain4.weight').value,
          color: this.grainBillForm.get('grain4.color').value,
          pH: this.grainBillForm.get('grain4.grain').value.pH,
          grainTypeId: this.grainBillForm.get('grain4.grain').value.id,
          grainType: this.grainBillForm.get('grain4.grain').value.type
        },
        {
          id: 5,
          name: this.grainBillForm.get('grain5.name').value,
          weight: this.grainBillForm.get('grain5.weight').value,
          color: this.grainBillForm.get('grain5.color').value,
          pH: this.grainBillForm.get('grain5.grain').value.pH,
          grainTypeId: this.grainBillForm.get('grain5.grain').value.id,
          grainType: this.grainBillForm.get('grain5.grain').value.type
        },
        {
          id: 6,
          name: this.grainBillForm.get('grain6.name').value,
          weight: this.grainBillForm.get('grain6.weight').value,
          color: this.grainBillForm.get('grain6.color').value,
          pH: this.grainBillForm.get('grain6.grain').value.pH,
          grainTypeId: this.grainBillForm.get('grain6.grain').value.id,
          grainType: this.grainBillForm.get('grain6.grain').value.type
        },
        {
          id: 7,
          name: this.grainBillForm.get('grain7.name').value,
          weight: this.grainBillForm.get('grain7.weight').value,
          color: this.grainBillForm.get('grain7.color').value,
          pH: this.grainBillForm.get('grain7.grain').value.pH,
          grainTypeId: this.grainBillForm.get('grain7.grain').value.id,
          grainType: this.grainBillForm.get('grain7.grain').value.type
        },
        {
          id: 8,
          name: this.grainBillForm.get('grain8.name').value,
          weight: this.grainBillForm.get('grain8.weight').value,
          color: this.grainBillForm.get('grain8.color').value,
          pH: this.grainBillForm.get('grain8.grain').value.pH,
          grainTypeId: this.grainBillForm.get('grain8.grain').value.id,
          grainType: this.grainBillForm.get('grain8.grain').value.type
        }
      ]
    };
    this.store.dispatch(new AddGrainBill(grainBill));
  }
}

