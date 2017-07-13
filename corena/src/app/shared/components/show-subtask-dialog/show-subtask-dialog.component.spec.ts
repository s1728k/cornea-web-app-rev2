import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSubtaskDialogComponent } from './show-subtask-dialog.component';

describe('ShowSubtaskDialogComponent', () => {
  let component: ShowSubtaskDialogComponent;
  let fixture: ComponentFixture<ShowSubtaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSubtaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSubtaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
