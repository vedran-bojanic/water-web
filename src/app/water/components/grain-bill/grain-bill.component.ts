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
  num = 1; // TODO: Load value from config file
  grainsDropdown: any[];
  grains: Grain[];
  selectedGrain: any;
  grain: Grain;

  grainForm = new FormGroup({
    name: new FormControl(''),
    weight: new FormControl(''),
    color: new FormControl('')
  });

  constructor(private grainService: GrainService, private router: Router) { }

  ngOnInit() {
    this.grainsDropdown = this.grainService.getDropdownGrains();
    this.grains = this.grainService.getGrains();
  }

  onSubmit() {
    console.log(this.grainForm.value);
  }

  onNext() {
    this.router.navigate(['/water/water-adjustment']);
  }

  onBack() {
    this.router.navigate(['/water/water-report']);
  }
}

