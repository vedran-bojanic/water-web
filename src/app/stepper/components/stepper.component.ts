import { Component, Input, OnInit } from '@angular/core';
import { StepDetails } from '../../shared/models/StepDetails';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html'
})
export class StepperComponent implements OnInit {

  @Input() details: StepDetails;
  ZERO_PERCENT = '0%';

  constructor() {
  }

  ngOnInit() {
  }

  private setStyle() {
    return { 'width': this.details ? this.details.stepperPercentage + '%' : this.ZERO_PERCENT };
  }
}
