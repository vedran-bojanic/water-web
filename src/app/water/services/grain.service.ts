import { Injectable } from '@angular/core';
import { GRAINS_DROPDOWN } from '../mocks/mock-grains';
import { GRAINS_DB } from '../mocks/mock-grains-db';

@Injectable()
export class GrainService {

  public getDropdownGrains(): Array<any> {
    return GRAINS_DROPDOWN;
  }

  public getGrains(): Array<any> {
    return GRAINS_DB;
  }
}
