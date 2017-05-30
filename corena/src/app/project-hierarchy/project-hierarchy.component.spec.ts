import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHierarchyComponent } from './project-hierarchy.component';

describe('ProjectHierarchyComponent', () => {
  let component: ProjectHierarchyComponent;
  let fixture: ComponentFixture<ProjectHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
