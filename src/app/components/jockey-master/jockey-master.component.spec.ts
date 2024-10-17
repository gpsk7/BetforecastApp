import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JockeyMasterComponent } from './jockey-master.component';

describe('JockeyMasterComponent', () => {
  let component: JockeyMasterComponent;
  let fixture: ComponentFixture<JockeyMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JockeyMasterComponent]
    });
    fixture = TestBed.createComponent(JockeyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
