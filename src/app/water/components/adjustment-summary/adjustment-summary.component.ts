import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adjustment-summary',
  templateUrl: './adjustment-summary.component.html'
})
export class AdjustmentSummaryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBack() {
    this.router.navigate(['/water-adjustment']);
  }

}
