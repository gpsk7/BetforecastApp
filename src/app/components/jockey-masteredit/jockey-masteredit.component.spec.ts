import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JockeyMastereditComponent } from './jockey-masteredit.component';

describe('JockeyMastereditComponent', () => {
  let component: JockeyMastereditComponent;
  let fixture: ComponentFixture<JockeyMastereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JockeyMastereditComponent]
    });
    fixture = TestBed.createComponent(JockeyMastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
