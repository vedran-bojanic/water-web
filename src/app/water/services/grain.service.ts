import { Injectable } from '@angular/core';
import { Grain } from '../models/grain';
import { GRAINS } from '../mocks/mock-grains';
import { GRAINS_DB } from '../mocks/mock-grains-db';

@Injectable()
export class GrainService {

  public getDropdownGrains(): Array<any> {
    return GRAINS;
  }

  public getGrains(): Array<Grain> {
    return GRAINS_DB;
  }
}
