import { TestBed } from '@angular/core/testing';

import { MoonMasterService } from './moon-master.service';

describe('MoonMasterService', () => {
  let service: MoonMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoonMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
