import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BeerStyle } from '../../state/water.interfaces';

@Injectable({
  providedIn: 'root'
})
export class WaterService {

  BEER_STYLE_URL = '/beerstyle';

  beerStyles: Array<BeerStyle>;

  constructor(private http: HttpClient) { }

  getBeerStyles(): Observable<Array<BeerStyle>> {
    return this.http.get<Array<BeerStyle>>(this.BEER_STYLE_URL).pipe(tap(beerStyle => this.beerStyles = beerStyle));
  }
}
