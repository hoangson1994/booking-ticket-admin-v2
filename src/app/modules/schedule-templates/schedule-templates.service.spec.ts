import { TestBed } from '@angular/core/testing';

import { ScheduleTemplatesService } from './schedule-templates.service';

describe('ScheduleTemplatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScheduleTemplatesService = TestBed.get(ScheduleTemplatesService);
    expect(service).toBeTruthy();
  });
});
