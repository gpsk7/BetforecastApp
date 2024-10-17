import { TestBed } from '@angular/core/testing';

import { AstrologyMasterService } from './astrology-master.service';

describe('AstrologyMasterService', () => {
  let service: AstrologyMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstrologyMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
