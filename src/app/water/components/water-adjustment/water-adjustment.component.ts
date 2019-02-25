import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-water-adjustment',
  templateUrl: './water-adjustment.component.html'
})
export class WaterAdjustmentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onNext() {
    this.router.navigate(['/water/adjustment-summary']);
  }

  onBack() {
    this.router.navigate(['/water/grain-bill']);
  }
}
