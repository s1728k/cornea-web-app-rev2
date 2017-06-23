import { TestBed, inject } from '@angular/core/testing';

import { SpinnerloaderService } from './spinnerloader.service';

describe('SpinnerloaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerloaderService]
    });
  });

  it('should ...', inject([SpinnerloaderService], (service: SpinnerloaderService) => {
    expect(service).toBeTruthy();
  }));
});
