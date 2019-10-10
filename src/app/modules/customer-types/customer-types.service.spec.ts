import { TestBed } from '@angular/core/testing';

import { CustomerTypesService } from './customer-types.service';

describe('CustomerTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerTypesService = TestBed.get(CustomerTypesService);
    expect(service).toBeTruthy();
  });
});
