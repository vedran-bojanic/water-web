import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { StepDetails } from './shared/models/StepDetails';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit  {
  private stepDetails: StepDetails;
  private show: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.stepDetails = this.route.root.firstChild.snapshot.data['stepDetails'];
        this.show = this.route.root.firstChild.snapshot.data['show'];
      }
    });
  }
}
