import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTemplateSelectorComponent } from './schedule-template-selector.component';

describe('ScheduleTemplateSelectorComponent', () => {
  let component: ScheduleTemplateSelectorComponent;
  let fixture: ComponentFixture<ScheduleTemplateSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTemplateSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTemplateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
