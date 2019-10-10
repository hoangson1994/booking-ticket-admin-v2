import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslatePipe} from './pipes/translate.pipe';
import {CustomImageUploadComponent} from './components/custom-image-upload/custom-image-upload.component';
import {RegionSelectorComponent} from './selector/region-selector/region-selector.component';
import {VehicleCategorySelectorComponent} from './selector/vehicle-category-selector/vehicle-category-selector.component';
import {VoyageSelectorComponent} from './selector/voyage-selector/voyage-selector.component';
import {CustomTimepickerComponent} from './components/custom-timepicker/custom-timepicker.component';
import {CustomDatepickerComponent} from './components/custom-datepicker/custom-datepicker.component';
import {UserSelectorComponent} from './selector/user-selector/user-selector.component';
import {VehicleSelectorComponent} from './selector/vehicle-selector/vehicle-selector.component';
import {ScheduleTemplateSelectorComponent} from './selector/schedule-template-selector/schedule-template-selector.component';
import {TabContentOrderComponent} from './tabs/tab-content-order/tab-content-order.component';
import {ScheduleSelectorComponent} from './selector/schedule-selector/schedule-selector.component';
import {TravelFromSelectorComponent} from './selector/travel-from-selector/travel-from-selector.component';
import {TravelToSelectorComponent} from './selector/travel-to-selector/travel-to-selector.component';
import { CustomerTypeSelectorComponent } from './selector/customer-type-selector/customer-type-selector.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
    declarations: [
        TranslatePipe,
        CustomImageUploadComponent,
        RegionSelectorComponent,
        VehicleCategorySelectorComponent,
        VoyageSelectorComponent,
        CustomTimepickerComponent,
        CustomDatepickerComponent,
        UserSelectorComponent,
        VehicleSelectorComponent,
        ScheduleTemplateSelectorComponent,
        TabContentOrderComponent,
        ScheduleSelectorComponent,
        TravelFromSelectorComponent,
        TravelToSelectorComponent,
        CustomerTypeSelectorComponent
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        BrowserModule,
        BrowserAnimationsModule,
        TranslatePipe,
        CustomImageUploadComponent,
        RegionSelectorComponent,
        VehicleCategorySelectorComponent,
        VoyageSelectorComponent,
        CustomTimepickerComponent,
        CustomDatepickerComponent,
        UserSelectorComponent,
        VehicleSelectorComponent,
        ScheduleTemplateSelectorComponent,
        TabContentOrderComponent,
        ScheduleSelectorComponent,
        TravelFromSelectorComponent,
        TravelToSelectorComponent,
        CustomerTypeSelectorComponent
    ]
})
export class SharedModule {
}
