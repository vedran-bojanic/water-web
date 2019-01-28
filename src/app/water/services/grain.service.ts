import { Injectable } from '@angular/core';
import { Grain } from '../models/grain';
import { GRAINS } from '../mocks/mock-grains';

@Injectable()
export class GrainService {

  public getGrains(): Array<Grain> {
    return GRAINS;
  }
}
