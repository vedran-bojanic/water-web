import { Component, OnInit } from '@angular/core';
import { StepperService } from './water/components/stepper/services/stepper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit  {

  constructor(private stepperService: StepperService) { }

  ngOnInit() {
    this.stepperService.init();
  }
}
