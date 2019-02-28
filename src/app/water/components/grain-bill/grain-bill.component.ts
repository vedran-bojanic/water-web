import { Component, OnInit } from '@angular/core';
import { GrainService } from '../../services/grain.service';
import { Grain } from '../../models/grain';
import { Router } from '@angular/router';
import { MultiplyElementPipe } from '../../../shared/pipes/multiply-element.pipe';

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

  constructor(private grainService: GrainService, private router: Router) { }

  ngOnInit() {
    this.grainsDropdown = this.grainService.getDropdownGrains();
    this.grains = this.grainService.getGrains();
  }

  onNext() {
    this.router.navigate(['/water/water-adjustment']);
  }

  onBack() {
    this.router.navigate(['/water/water-report']);
  }
}

