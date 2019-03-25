import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BeerStyle } from '../../state/water.interfaces';
import { WaterStateModel } from '../../state/water-state.model';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class WaterService {

  beerStyles: BeerStyle[];
  waters: WaterStateModel[];
  water: WaterStateModel;
  private ngUnsubscribe: Subject<any>;

  constructor(private http: HttpClient, private store: Store) {
    this.ngUnsubscribe = new Subject();
  }

  getBeerStyles(): Observable<BeerStyle[]> {
    if (this.beerStyles) {
      return of(this.beerStyles);
    }
    return this.http.get<BeerStyle[]>('/beerstyles')
      .pipe(tap(beerStyles => this.beerStyles = beerStyles));
  }

  getAllWaters(): Observable<WaterStateModel[]> {
    if (this.waters) {
      return of(this.waters);
    }
    return this.http.get<WaterStateModel[]>('/waters')
      .pipe(tap(waters => this.waters = waters));
  }

  saveWater() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.store.selectOnce(state => state.water)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((water: WaterStateModel) => {
        this.water = water;
      });

    return this.http.post<WaterStateModel>('/waters', this.water, httpOptions);
  }

  loadBeer(id: number): Observable<WaterStateModel> {
    return this.http.get<WaterStateModel>('/waters/' + id);
  }
}
