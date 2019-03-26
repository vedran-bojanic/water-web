import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { GrainType } from '../../state/water.interfaces';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GrainService {

  grainTypes: GrainType[];
  private ngUnsubscribe: Subject<any>;

  constructor(private http: HttpClient) {
    this.ngUnsubscribe = new Subject();
  }

  public getGrainTypes(): Observable<GrainType[]> {
    if (this.grainTypes) {
      return of(this.grainTypes);
    }
    return this.http.get<GrainType[]>('/grains')
      .pipe(tap(grainTypes => this.grainTypes = grainTypes));
  }
}
