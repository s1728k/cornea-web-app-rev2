import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCompleteTaskDialogComponent } from './show-complete-task-dialog.component';

describe('ShowCompleteTaskDialogComponent', () => {
  let component: ShowCompleteTaskDialogComponent;
  let fixture: ComponentFixture<ShowCompleteTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCompleteTaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCompleteTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
