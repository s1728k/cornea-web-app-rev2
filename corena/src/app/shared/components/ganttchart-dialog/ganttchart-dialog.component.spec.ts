import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttchartDialogComponent } from './ganttchart-dialog.component';

describe('GanttchartDialogComponent', () => {
  let component: GanttchartDialogComponent;
  let fixture: ComponentFixture<GanttchartDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttchartDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttchartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
