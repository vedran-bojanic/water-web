import { TestBed } from '@angular/core/testing';

import { WaterStateService } from './water-state.service';

describe('WaterStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaterStateService = TestBed.get(WaterStateService);
    expect(service).toBeTruthy();
  });
});
