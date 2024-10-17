import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceMastereditComponent } from './race-masteredit.component';

describe('RaceMastereditComponent', () => {
  let component: RaceMastereditComponent;
  let fixture: ComponentFixture<RaceMastereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaceMastereditComponent]
    });
    fixture = TestBed.createComponent(RaceMastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
