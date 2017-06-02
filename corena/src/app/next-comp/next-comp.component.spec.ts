import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextCompComponent } from './next-comp.component';

describe('NextCompComponent', () => {
  let component: NextCompComponent;
  let fixture: ComponentFixture<NextCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
