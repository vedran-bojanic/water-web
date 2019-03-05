import { Component, OnInit } from '@angular/core';
import { GrainService } from '../../services/grain.service';
import { Router } from '@angular/router';
import { MultiplyElementPipe } from '../../../shared/pipes/multiply-element.pipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Grain } from '../models/grain.model';
import { AddGrainBill } from './states/grain-bill.action';

@Component({
  selector: 'app-grain-bill',
  templateUrl: './grain-bill.component.html',
  providers: [ MultiplyElementPipe ]
})
export class GrainBillComponent implements OnInit {
  num = 1; // TODO: Load value from config file
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
    // this.grains = this.grainService.getGrains();
  }

  onChange(grain: Grain) {
    this.selectedGrain = grain;
  }

  onSubmit() {
    this.storeGrainBill();
  }

  onNext() {
    this.router.navigate(['/water/water-adjustment']);
  }

  onBack() {
    this.router.navigate(['/water/water-report']);
  }

  private createForm() {
    this.grainBillForm = this.fb.group({
      grain: this.fb.group({
        id: [''],
        grain: [''],
        name: [''],
        weight: [''],
        color: ['']
      })
    });
  }

  private storeGrainBill() {
    const grain: Grain = {
      id: 1,
      name: this.grainBillForm.get('grain.name').value,
      weight: this.grainBillForm.get('grain.weight').value,
      color: this.grainBillForm.get('grain.color').value,
      pH: this.grainBillForm.get('grain.grain').value.pH,
      grainTypeId: this.grainBillForm.get('grain.grain').value.id,
      grainType: this.grainBillForm.get('grain.grain').value.type
    };
    this.store.dispatch(new AddGrainBill(grain));
  }
}

