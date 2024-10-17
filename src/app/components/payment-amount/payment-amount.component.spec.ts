import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAmountComponent } from './payment-amount.component';

describe('PaymentAmountComponent', () => {
  let component: PaymentAmountComponent;
  let fixture: ComponentFixture<PaymentAmountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentAmountComponent]
    });
    fixture = TestBed.createComponent(PaymentAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
