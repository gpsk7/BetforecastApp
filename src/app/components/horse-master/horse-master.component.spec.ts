import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseMasterComponent } from './horse-master.component';

describe('HorseMasterComponent', () => {
  let component: HorseMasterComponent;
  let fixture: ComponentFixture<HorseMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorseMasterComponent]
    });
    fixture = TestBed.createComponent(HorseMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
