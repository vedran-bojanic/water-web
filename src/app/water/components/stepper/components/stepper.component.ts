import { Component, OnInit } from '@angular/core';
import { StepperService } from '../services/stepper.service';
import { Observable } from 'rxjs';
import { StepDetails } from '../../../../shared/models/StepDetails';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html'
})
export class StepperComponent implements OnInit {
  stepDetails$: Observable<StepDetails>;

  constructor(private stepperService: StepperService) {
  }

  ngOnInit() {
    this.stepDetails$ = this.stepperService.stepDetails$;
  }

  private setStyle(stepDetails: StepDetails) {
    return { 'width': + stepDetails.stepperPercentage + '%' };
  }
}
