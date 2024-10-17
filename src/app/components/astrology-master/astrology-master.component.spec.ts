import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrologyMasterComponent } from './astrology-master.component';

describe('AstrologyMasterComponent', () => {
  let component: AstrologyMasterComponent;
  let fixture: ComponentFixture<AstrologyMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AstrologyMasterComponent]
    });
    fixture = TestBed.createComponent(AstrologyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
