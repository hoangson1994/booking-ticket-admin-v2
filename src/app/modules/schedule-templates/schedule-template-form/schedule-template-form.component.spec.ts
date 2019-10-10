import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTemplateFormComponent } from './schedule-template-form.component';

describe('ScheduleTemplateFormComponent', () => {
  let component: ScheduleTemplateFormComponent;
  let fixture: ComponentFixture<ScheduleTemplateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTemplateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
