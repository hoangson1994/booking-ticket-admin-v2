import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleCategoryFormComponent } from './vehicle-category-form/vehicle-category-form.component';
import { VehicleCategoryListComponent } from './vehicle-category-list/vehicle-category-list.component';
import { VehiclesFormComponent } from './vehicles-form/vehicles-form.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ROUTER_GROUPS} from '../../app-routing.module';



@NgModule({
  declarations: [VehicleCategoryFormComponent, VehicleCategoryListComponent, VehiclesFormComponent, VehiclesListComponent],
  imports: [
      SharedModule,
      RouterModule.forRoot([ROUTER_GROUPS.VEHICLE_GROUP])
  ]
})
export class VehicleModule { }
