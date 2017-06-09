import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqUploadComponent } from './boq-upload.component';

describe('BoqUploadComponent', () => {
  let component: BoqUploadComponent;
  let fixture: ComponentFixture<BoqUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoqUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
