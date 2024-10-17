import { TestBed } from '@angular/core/testing';

import { RaceMasterService } from './race-master.service';

describe('RaceMasterService', () => {
  let service: RaceMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaceMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
