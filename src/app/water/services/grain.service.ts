import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { GrainDropdown } from '../../state/water.interfaces';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GrainService {

  grainsDropdown: GrainDropdown[];
  private ngUnsubscribe: Subject<any>;

  constructor(private http: HttpClient) {
    this.ngUnsubscribe = new Subject();
  }

  public getDropdownGrains(): Observable<GrainDropdown[]> {
    if (this.grainsDropdown) {
      return of(this.grainsDropdown);
    }
    return this.http.get<GrainDropdown[]>('/grains')
      .pipe(tap(grainsDropdown => this.grainsDropdown = grainsDropdown));
  }
}
