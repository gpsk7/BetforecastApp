import { TestBed } from '@angular/core/testing';

import { ForgotPasswordService } from '../Services/forgot-password-service.service';

describe('ForgotPasswordServiceService', () => {
  let service: ForgotPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
