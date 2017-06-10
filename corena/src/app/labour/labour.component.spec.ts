import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourComponent } from './labour.component';

describe('LabourComponent', () => {
  let component: LabourComponent;
  let fixture: ComponentFixture<LabourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
