import { TestBed } from '@angular/core/testing';

import { InplayMasterService } from './inplay-master.service';

describe('InplayMasterService', () => {
  let service: InplayMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InplayMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
