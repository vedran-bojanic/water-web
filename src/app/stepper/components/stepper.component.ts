import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html'
})
export class StepperComponent implements OnInit {

  private stepperPercentage: number;
  private showStepper: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.stepperPercentage = this.route.root.firstChild.snapshot.data['stepperPercentage'];
        this.showStepper = this.route.root.firstChild.snapshot.data['showStepper'];
      }
    });
  }

  private setStyle() {
    return { 'width': this.stepperPercentage ? this.stepperPercentage + '%' : '0%' };
  }
}
