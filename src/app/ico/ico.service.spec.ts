import { TestBed, inject } from '@angular/core/testing';

import { IcoService } from './ico.service';

describe('IcoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IcoService]
    });
  });

  it('should be created', inject([IcoService], (service: IcoService) => {
    expect(service).toBeTruthy();
  }));
});
