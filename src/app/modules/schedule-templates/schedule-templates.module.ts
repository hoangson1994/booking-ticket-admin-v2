import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { ScheduleTemplateFormComponent } from './schedule-template-form/schedule-template-form.component';
import {RouterModule} from '@angular/router';
import {ROUTER_GROUPS} from '../../app-routing.module';
import { ScheduleTemplatesListComponent } from './schedule-templates-list/schedule-templates-list.component';


@NgModule({
    declarations: [ScheduleTemplateFormComponent, ScheduleTemplatesListComponent],
    imports: [
        SharedModule,
        RouterModule.forRoot([ROUTER_GROUPS.SCHEDULE_TEMPLATE_GROUP])
    ]
})
export class ScheduleTemplatesModule {
}
