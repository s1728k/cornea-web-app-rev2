import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParentTaskComponent } from './create-parent-task.component';

describe('CreateParentTaskComponent', () => {
  let component: CreateParentTaskComponent;
  let fixture: ComponentFixture<CreateParentTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateParentTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
