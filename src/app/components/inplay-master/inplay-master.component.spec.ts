import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InplayMasterComponent } from './inplay-master.component';

describe('InplayMasterComponent', () => {
  let component: InplayMasterComponent;
  let fixture: ComponentFixture<InplayMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InplayMasterComponent]
    });
    fixture = TestBed.createComponent(InplayMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
