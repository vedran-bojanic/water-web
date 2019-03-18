import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MashPh } from '../../../state/water.interfaces';

@Component({
  selector: 'app-mash-ph',
  templateUrl: './mash-ph.component.html'
})
export class MashPhComponent implements OnInit {

  private ngUnsubscribe: Subject<any>;
  mashPh: MashPh;

  constructor(private store: Store) {
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit() {
    this.store.select(state => state.water.mashPh)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((mp: MashPh) => this.mashPh = mp);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
