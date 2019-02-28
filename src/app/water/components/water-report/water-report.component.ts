import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-water',
  templateUrl: './water-report.component.html'
})
export class WaterReportComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onNext() {
    this.router.navigate(['/water/grain-bill']);
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
