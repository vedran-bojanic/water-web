import { TestBed } from '@angular/core/testing';

import { WaterService } from './water.service';

describe('WaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaterService = TestBed.get(WaterService);
    expect(service).toBeTruthy();
  });
});
