import { Component, OnInit } from '@angular/core';
import { GrainService } from '../../services/grain.service';
import { Grain } from '../../models/grain';
import { Router } from '@angular/router';
import { MultiplyElementPipe } from '../../../shared/pipes/multiply-element.pipe';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-grain-bill',
  templateUrl: './grain-bill.component.html',
  providers: [ MultiplyElementPipe ]
})
export class GrainBillComponent implements OnInit {
  num = 8; // TODO: Load value from config file
  grainsDropdown: any[];
  grains: Grain[];
  selectedGrain: any;
  grain: Grain;

  GrainForm: FormGroup;

  constructor(private grainService: GrainService, private router: Router) { }

  ngOnInit() {
    this.GrainForm = new FormGroup({
      grain: new FormControl(null),
      name: new FormControl(null),
      weight: new FormControl(null),
      color: new FormControl(null),
      pH: new FormControl(null)
    });

    this.grainsDropdown = this.grainService.getDropdownGrains();
    this.grains = this.grainService.getGrains();
  }

  onChange(x: any) {
    console.log(x);
  }

  onSave() {
    console.log(this.GrainForm.value);
    alert('CHANGE');
  }

  onNext() {
    this.router.navigate(['/water/water-adjustment']);
  }

  onBack() {
    this.router.navigate(['/water/water-report']);
  }
}

