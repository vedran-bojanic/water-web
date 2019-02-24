import { Component, Input, OnInit } from '@angular/core';
import { StepDetails } from '../../shared/models/StepDetails';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html'
})
export class StepperComponent implements OnInit {

  @Input() details: StepDetails;
  private stepperPercentage: number;
  private name: string;
  ZERO_PERCENT = '0%';

  constructor() {
  }

  ngOnInit() {
    this.name = this.details.name;
    this.stepperPercentage = this.details.stepperPercentage;
  }

  private setStyle() {
    return { 'width': this.details ? this.stepperPercentage + '%' : this.ZERO_PERCENT };
  }
}
