import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyFormComponent } from './policy-form/policy-form.component';
import { PoliciesListComponent } from './policies-list/policies-list.component';
import { PolicyEditFormComponent } from './policy-edit-form/policy-edit-form.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ROUTER_GROUPS} from '../../app-routing.module';
import { MembersListComponent } from './members-list/members-list.component';



@NgModule({
  declarations: [PolicyFormComponent, PoliciesListComponent, PolicyEditFormComponent, MembersListComponent],
  imports: [
    SharedModule,
    RouterModule.forRoot([ROUTER_GROUPS.POLICY_GROUP])
  ]
})
export class PoliciesModule { }
