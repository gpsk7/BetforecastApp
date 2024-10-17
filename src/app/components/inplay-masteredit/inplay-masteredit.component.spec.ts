import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InplayMastereditComponent } from './inplay-masteredit.component';

describe('InplayMastereditComponent', () => {
  let component: InplayMastereditComponent;
  let fixture: ComponentFixture<InplayMastereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InplayMastereditComponent]
    });
    fixture = TestBed.createComponent(InplayMastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
