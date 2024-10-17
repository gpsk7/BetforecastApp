import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureOfTheDayMasterComponent } from './nature-of-the-day-master.component';

describe('NatureOfTheDayMasterComponent', () => {
  let component: NatureOfTheDayMasterComponent;
  let fixture: ComponentFixture<NatureOfTheDayMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NatureOfTheDayMasterComponent]
    });
    fixture = TestBed.createComponent(NatureOfTheDayMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
