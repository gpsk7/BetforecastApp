import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerMasterComponent } from './trainer-master.component';

describe('TrainerMasterComponent', () => {
  let component: TrainerMasterComponent;
  let fixture: ComponentFixture<TrainerMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerMasterComponent]
    });
    fixture = TestBed.createComponent(TrainerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
