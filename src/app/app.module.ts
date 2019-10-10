import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N, vi_VN} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import vi from '@angular/common/locales/vi';
import {HeaderComponent} from './layouts/header/header.component';
import {SidebarComponent} from './layouts/sidebar/sidebar.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SharedModule} from './shared/shared.module';
import {LoginComponent} from './modules/auth/login/login.component';
import {VoyagesModule} from './modules/voyages/voyages.module';
import {VehicleModule} from './modules/vehicle/vehicle.module';
import {ScheduleTemplatesModule} from './modules/schedule-templates/schedule-templates.module';
import {UserModule} from './modules/user/user.module';
import {ScheduleModule} from './modules/schedules/schedule.module';
import {OrderModule} from './modules/order/order.module';
import {CustomerTypesModule} from './modules/customer-types/customer-types.module';

registerLocaleData(vi);

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent,
        DashboardComponent,
        LoginComponent
    ],
    imports: [
        CustomerTypesModule,
        OrderModule,
        ScheduleModule,
        VehicleModule,
        VoyagesModule,
        ScheduleTemplatesModule,
        UserModule,
        SharedModule,
        AppRoutingModule
    ],
    providers: [{provide: NZ_I18N, useValue: vi_VN}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
