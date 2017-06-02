import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAnalysisComponent } from './rate-analysis.component';

describe('RateAnalysisComponent', () => {
  let component: RateAnalysisComponent;
  let fixture: ComponentFixture<RateAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
