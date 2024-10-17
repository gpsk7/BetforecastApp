import { TestBed } from '@angular/core/testing';

import { PublicRaceService } from './public-race.service';

describe('PublicRaceService', () => {
  let service: PublicRaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicRaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
