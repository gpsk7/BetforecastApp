import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonMasterComponent } from './moon-master.component';

describe('MoonMasterComponent', () => {
  let component: MoonMasterComponent;
  let fixture: ComponentFixture<MoonMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoonMasterComponent]
    });
    fixture = TestBed.createComponent(MoonMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
