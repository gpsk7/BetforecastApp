import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceMasterComponent } from './race-master.component';

describe('RaceMasterComponent', () => {
  let component: RaceMasterComponent;
  let fixture: ComponentFixture<RaceMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaceMasterComponent]
    });
    fixture = TestBed.createComponent(RaceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
