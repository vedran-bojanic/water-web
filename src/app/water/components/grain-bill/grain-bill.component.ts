import { Component, OnInit } from '@angular/core';
import { GrainService } from '../../services/grain.service';
import { Grain } from '../../models/grain';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grain-bill',
  templateUrl: './grain-bill.component.html'
})
export class GrainBillComponent implements OnInit {
  grains: Array<Grain>;
  selectedGrain: Grain;

  constructor(private grainService: GrainService, private router: Router ) { }

  ngOnInit() {
    this.grains = this.grainService.getGrains();
    this.selectedGrain = { id: 0, name: '- Select Grain -', pH: 0, type: null };
  }

  selectGrain(newGrain: Grain) {
    this.selectedGrain = newGrain;
  }

  onNext() {
    this.router.navigate(['/water-adjustment']);
  }

  onBack() {
    this.router.navigate(['/water-report']);
  }
}
