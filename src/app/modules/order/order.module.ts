import {NgModule} from '@angular/core';
import {OrderListComponent} from './order-list/order-list.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ROUTER_GROUPS} from '../../app-routing.module';
import {OrderCreateComponent} from './order-create/order-create.component';
import {OrderFormComponent} from './order-form/order-form.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [OrderListComponent, OrderCreateComponent, OrderFormComponent, OrderDetailComponent],
  imports: [
    SharedModule,
    RouterModule.forRoot([ROUTER_GROUPS.ORDER_GROUP])
  ],
  entryComponents: [OrderFormComponent]
})
export class OrderModule {
}
