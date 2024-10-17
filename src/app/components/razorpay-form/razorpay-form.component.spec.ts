import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RazorpayFormComponent } from './razorpay-form.component';

describe('RazorpayFormComponent', () => {
  let component: RazorpayFormComponent;
  let fixture: ComponentFixture<RazorpayFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RazorpayFormComponent]
    });
    fixture = TestBed.createComponent(RazorpayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
