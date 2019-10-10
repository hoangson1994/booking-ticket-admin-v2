import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoyageFormComponent} from './voyage-form/voyage-form.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ROUTER_GROUPS} from '../../app-routing.module';
import { VoyagesListComponent } from './voyages-list/voyages-list.component';


@NgModule({
    declarations: [VoyageFormComponent, VoyagesListComponent],
    imports: [
        SharedModule,
        RouterModule.forRoot([ROUTER_GROUPS.VOYAGE_GROUP])
    ]
})
export class VoyagesModule {
}
