import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureOfTheDayMastereditComponent } from './nature-of-the-day-masteredit.component';

describe('NatureOfTheDayMastereditComponent', () => {
  let component: NatureOfTheDayMastereditComponent;
  let fixture: ComponentFixture<NatureOfTheDayMastereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NatureOfTheDayMastereditComponent]
    });
    fixture = TestBed.createComponent(NatureOfTheDayMastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
