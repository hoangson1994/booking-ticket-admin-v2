import { TestBed } from '@angular/core/testing';

import { VoyagesService } from './voyages.service';

describe('VoyagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoyagesService = TestBed.get(VoyagesService);
    expect(service).toBeTruthy();
  });
});
