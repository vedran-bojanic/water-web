import { Component, Input, OnInit } from '@angular/core';
import { StepDetails } from '../../../../shared/models/StepDetails';
import { StepperService } from '../services/stepper.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  private setStyle(percentage: number) {
    return { 'width': percentage.toString() + '%' };
  }
}
