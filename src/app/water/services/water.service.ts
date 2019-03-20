import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BeerStyle } from '../models/beer-style.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WaterService {

  BEER_STYLE_URL = '/beerstyle';

  beerStyles: Array<BeerStyle>;

  constructor(private http: HttpClient) { }

  getBeerStyles(): Observable<Array<BeerStyle>> {
    if (this.beerStyles) {
      return Observable.create(this.beerStyles);
    }
    return this.http.get<Array<BeerStyle>>(this.BEER_STYLE_URL)
      .pipe(tap(beerStyle => this.beerStyles = beerStyle));
  }
}
