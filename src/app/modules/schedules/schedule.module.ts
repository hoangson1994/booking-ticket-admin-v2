import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesFormComponent } from './schedules-form/schedules-form.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import {SharedModule} from '../../shared/shared.module';
import {Router, RouterModule} from '@angular/router';
import {ROUTER_GROUPS} from '../../app-routing.module';

@NgModule({
  declarations: [SchedulesFormComponent, ScheduleListComponent],
  imports: [
    SharedModule,
    RouterModule.forRoot([ROUTER_GROUPS.SCHEDULE_GROUP])
  ]
})
export class ScheduleModule { }
