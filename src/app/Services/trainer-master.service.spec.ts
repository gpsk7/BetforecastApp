import { TestBed } from '@angular/core/testing';

import { TrainerMasterService } from './trainer-master.service';

describe('TrainerMasterService', () => {
  let service: TrainerMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
