import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerTypeFormComponent} from './customer-type-form/customer-type-form.component';
import {CustomerTypesListComponent} from './customer-types-list/customer-types-list.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ROUTER_GROUPS} from '../../app-routing.module';


@NgModule({
    declarations: [CustomerTypeFormComponent, CustomerTypesListComponent],
    imports: [
        SharedModule,
        RouterModule.forRoot([ROUTER_GROUPS.CUSTOMER_TYPE_GROUP])
    ]
})
export class CustomerTypesModule {
}
