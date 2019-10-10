import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTemplatesListComponent } from './schedule-templates-list.component';

describe('ScheduleTemplatesListComponent', () => {
  let component: ScheduleTemplatesListComponent;
  let fixture: ComponentFixture<ScheduleTemplatesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTemplatesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTemplatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
