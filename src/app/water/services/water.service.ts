import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BeerStyle } from '../../state/water.interfaces';
import { WaterStateModel } from '../../state/water-state.model';

@Injectable({
  providedIn: 'root'
})
export class WaterService {

  BEER_STYLES_URL = '/beerstyles';
  WATERS_URL = '/waters';

  beerStyles: Array<BeerStyle>;
  waters: Array<WaterStateModel>;

  constructor(private http: HttpClient) { }

  getBeerStyles(): Observable<Array<BeerStyle>> {
    if (this.beerStyles) {
      return Observable.create(this.beerStyles);
    }
    return this.http.get<Array<BeerStyle>>(this.BEER_STYLES_URL).pipe(tap(beerStyles => this.beerStyles = beerStyles));
  }

  getAllWaters(): Observable<Array<WaterStateModel>> {
    if (this.waters) {
      return Observable.create(this.waters);
    }
    return this.http.get<Array<WaterStateModel>>(this.WATERS_URL).pipe(tap(waters => this.waters = waters));
  }
}
