import { TestBed } from '@angular/core/testing';

import { UnitTimeService } from './unit-time.service';

describe('UnitTimeService', () => {
  let service: UnitTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
