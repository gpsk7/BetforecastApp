import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonMastereditComponent } from './moon-masteredit.component';

describe('MoonMastereditComponent', () => {
  let component: MoonMastereditComponent;
  let fixture: ComponentFixture<MoonMastereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoonMastereditComponent]
    });
    fixture = TestBed.createComponent(MoonMastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
