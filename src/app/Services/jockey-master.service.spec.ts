import { TestBed } from '@angular/core/testing';

import { JockeyMasterService } from './jockey-master.service';

describe('JockeyMasterService', () => {
  let service: JockeyMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JockeyMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
