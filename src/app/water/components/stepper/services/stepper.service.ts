import { Injectable } from '@angular/core';
import { filter, map, shareReplay } from 'rxjs/operators';
import { ActivationEnd, Router } from '@angular/router';
import { StepDetails } from '../../../../shared/models/StepDetails';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  stepDetails$: ReplaySubject<StepDetails> = new ReplaySubject(1);

  constructor(private router: Router) { }

  init() {
     this.router.events.pipe(
      filter(e => e instanceof ActivationEnd),
      filter(e => (e as ActivationEnd).snapshot.data['stepDetails']),
      map(e => (e as ActivationEnd).snapshot.data['stepDetails']))
       .subscribe(x => this.stepDetails$.next(x));
  }
}
