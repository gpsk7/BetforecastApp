import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotOtpVerifyComponent } from './forgot-otp-verify.component';

describe('ForgotOtpVerifyComponent', () => {
  let component: ForgotOtpVerifyComponent;
  let fixture: ComponentFixture<ForgotOtpVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotOtpVerifyComponent]
    });
    fixture = TestBed.createComponent(ForgotOtpVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
