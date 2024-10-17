import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseMastereditComponent } from './horse-masteredit.component';

describe('HorseMastereditComponent', () => {
  let component: HorseMastereditComponent;
  let fixture: ComponentFixture<HorseMastereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorseMastereditComponent]
    });
    fixture = TestBed.createComponent(HorseMastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
