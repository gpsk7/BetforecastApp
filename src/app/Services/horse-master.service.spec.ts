import { TestBed } from '@angular/core/testing';

import { HorseMasterService } from './horse-master.service';

describe('HorseMasterService', () => {
  let service: HorseMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorseMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
