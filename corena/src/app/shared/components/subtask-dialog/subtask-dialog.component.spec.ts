import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskDialogComponent } from './subtask-dialog.component';

describe('SubtaskDialogComponent', () => {
  let component: SubtaskDialogComponent;
  let fixture: ComponentFixture<SubtaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
