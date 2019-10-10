import {NgModule} from '@angular/core';
import {UserFormComponent} from './user-form/user-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {RouterModule} from '@angular/router';
import {ROUTER_GROUPS} from '../../app-routing.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [UserFormComponent, UserListComponent],
  imports: [
    SharedModule,
    RouterModule.forRoot([ROUTER_GROUPS.USER_GROUP])
  ]
})
export class UserModule {
}
