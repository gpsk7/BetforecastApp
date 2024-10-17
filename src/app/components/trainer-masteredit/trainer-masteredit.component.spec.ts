import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerMastereditComponent } from './trainer-masteredit.component';

describe('TrainerMastereditComponent', () => {
  let component: TrainerMastereditComponent;
  let fixture: ComponentFixture<TrainerMastereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerMastereditComponent]
    });
    fixture = TestBed.createComponent(TrainerMastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
