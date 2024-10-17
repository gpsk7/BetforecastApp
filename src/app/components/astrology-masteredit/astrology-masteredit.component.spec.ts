import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrologyMastereditComponent } from './astrology-masteredit.component';

describe('AstrologyMastereditComponent', () => {
  let component: AstrologyMastereditComponent;
  let fixture: ComponentFixture<AstrologyMastereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AstrologyMastereditComponent]
    });
    fixture = TestBed.createComponent(AstrologyMastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
