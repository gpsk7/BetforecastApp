import { TestBed } from '@angular/core/testing';

import { NatureoftheDayService } from './natureofthe-day.service';

describe('NatureoftheDayService', () => {
  let service: NatureoftheDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureoftheDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
