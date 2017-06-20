import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAnalysisDisplayComponent } from './rate-analysis-display.component';

describe('RateAnalysisDisplayComponent', () => {
  let component: RateAnalysisDisplayComponent;
  let fixture: ComponentFixture<RateAnalysisDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateAnalysisDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateAnalysisDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
