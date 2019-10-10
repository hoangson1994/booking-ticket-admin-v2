import {NgModule} from '@angular/core';
import {RouterModule, Routes, Route} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {VoyageFormComponent} from './modules/voyages/voyage-form/voyage-form.component';
import {LoginComponent} from './modules/auth/login/login.component';
import {VehicleCategoryFormComponent} from './modules/vehicle/vehicle-category-form/vehicle-category-form.component';
import {VehicleCategoryListComponent} from './modules/vehicle/vehicle-category-list/vehicle-category-list.component';
import {VehiclesListComponent} from './modules/vehicle/vehicles-list/vehicles-list.component';
import {VehiclesFormComponent} from './modules/vehicle/vehicles-form/vehicles-form.component';
import {VoyagesListComponent} from './modules/voyages/voyages-list/voyages-list.component';
import {ScheduleTemplateFormComponent} from './modules/schedule-templates/schedule-template-form/schedule-template-form.component';
import {ScheduleTemplatesListComponent} from './modules/schedule-templates/schedule-templates-list/schedule-templates-list.component';
import {UserFormComponent} from './modules/user/user-form/user-form.component';
import {UserListComponent} from './modules/user/user-list/user-list.component';
import {SchedulesFormComponent} from './modules/schedules/schedules-form/schedules-form.component';
import {ScheduleListComponent} from './modules/schedules/schedule-list/schedule-list.component';
import {OrderListComponent} from './modules/order/order-list/order-list.component';
import {OrderCreateComponent} from './modules/order/order-create/order-create.component';
import {ERouters} from './resources/static.resource';
import {CustomerTypeFormComponent} from './modules/customer-types/customer-type-form/customer-type-form.component';
import {CustomerTypesListComponent} from './modules/customer-types/customer-types-list/customer-types-list.component';
import {OrderDetailComponent} from './modules/order/order-detail/order-detail.component';

/**
 * - Router group để side bar có thể import và tự động điều chỉnh các phần tử.
 * - Các module con sẽ lấy từng phần tử con của router groups để routing riêng
 */
export const ROUTER_GROUPS = {
    APP_GROUP: {
        name: null,
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
                data: {
                    display: false
                }
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    name: 'Dashboard',
                    icon: 'area-chart',
                    display: true
                }
            },
            {
                path: 'auth/login',
                component: LoginComponent,
                data: {
                    name: 'Đăng nhập',
                    icon: 'Dashboard',
                    display: false
                }
            },
        ] as Routes
    },
    ORDER_GROUP: {
        name: 'Đặt chuyến cho khách',
        path: 'order',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'list-order',
                component: OrderListComponent,
                data: {
                    name: 'Danh sách đặt chuyến',
                    icon: 'unordered-list',
                    display: true
                }
            },
            {
                path: 'create-order',
                component: OrderCreateComponent,
                data: {
                    name: 'Đặt chuyến',
                    icon: 'plus',
                    display: true
                }
            },
            {
                path: 'edit',
                component: OrderDetailComponent,
                data: {
                    name: 'Chi tiết chuyến',
                    icon: 'plus',
                    display: false
                }
            }

        ]
    },
    VEHICLE_GROUP: {
        name: 'Quản lí xe',
        path: 'vehicles',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'edit-vehicle-category/:id',
                component: VehicleCategoryFormComponent,
                data: {
                    name: 'Sửa nhóm xe',
                    icon: '',
                    display: false
                }
            },
            {
                path: 'vehicle-category-list',
                component: VehicleCategoryListComponent,
                data: {
                    name: 'Danh sách nhóm xe',
                    icon: 'unordered-list',
                    display: true
                }
            },
            {
                path: 'vehicle-category-form',
                component: VehicleCategoryFormComponent,
                data: {
                    name: 'Thêm nhóm xe',
                    icon: 'plus',
                    display: true
                }
            },
            {
                path: 'vehicle-list',
                component: VehiclesListComponent,
                data: {
                    name: 'Danh sách xe',
                    icon: 'unordered-list',
                    display: true
                }
            },
            {
                path: 'vehicle-form',
                component: VehiclesFormComponent,
                data: {
                    name: 'Thêm xe',
                    icon: 'plus',
                    display: true
                }
            },
            {
                path: 'edit-vehicle/:id',
                component: VehiclesFormComponent,
                data: {
                    name: 'Sửa xe',
                    icon: '',
                    display: false
                }
            }
        ] as Routes
    },
    VOYAGE_GROUP: {
        name: 'Quản lí tuyến đường',
        path: 'voyages',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'create',
                component: VoyageFormComponent,
                data: {
                    name: 'Thêm tuyến đường',
                    icon: 'plus',
                    display: true
                }
            },
            {
                path: 'list',
                component: VoyagesListComponent,
                data: {
                    name: 'Danh sách tuyến đường',
                    icon: 'unordered-list',
                    display: true
                }
            },
        ] as Routes
    },
    SCHEDULE_TEMPLATE_GROUP: {
        name: 'Quản lí mẫu lịch',
        path: 'schedule-templates',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'create',
                component: ScheduleTemplateFormComponent,
                data: {
                    name: 'Thêm mẫu lịch',
                    icon: 'plus',
                    display: true
                }
            },
            {
                path: 'list',
                component: ScheduleTemplatesListComponent,
                data: {
                    name: 'Danh sách mẫu lịch',
                    icon: 'unordered-list',
                    display: true
                }
            },
            {
                path: 'edit',
                component: ScheduleTemplateFormComponent,
                data: {
                    name: 'Chỉnh sửa mẫu lịch',
                    icon: 'unordered-list',
                    display: false
                }
            },
        ] as Routes
    },
    USER_GROUP: {
        name: 'Quản lý người dùng',
        path: 'user',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'create-user',
                component: UserFormComponent,
                data: {
                    name: 'Thêm nhân viên',
                    icon: 'plus',
                    display: true
                }
            },
            {
                path: 'list-user',
                component: UserListComponent,
                data: {
                    name: 'Danh sách nhân viên',
                    icon: 'unordered-list',
                    display: true
                }
            },
            {
                path: 'edit-user/:id',
                component: UserFormComponent,
                data: {
                    name: 'Sửa nhân viên',
                    icon: 'unordered-list',
                    display: false
                }
            }
        ] as Routes
    },
    SCHEDULE_GROUP: {
        name: 'Quản lý lich',
        path: 'schedules',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'create-schedule',
                component: SchedulesFormComponent,
                data: {
                    icon: 'plus',
                    display: true,
                    name: 'Tạo lịch'
                }
            },
            {
                path: 'edit-schedule',
                component: SchedulesFormComponent,
                data: {
                    icon: 'plus',
                    display: false,
                    name: 'Tạo lịch'
                }
            },
            {
                path: 'list-schedule',
                component: ScheduleListComponent,
                data: {
                    icon: 'unordered-list',
                    name: 'Danh sách lịch',
                    display: true
                }
            }
        ] as Routes
    },
    CUSTOMER_TYPE_GROUP: {
        name: 'Quản lí kiểu khách hàng',
        path: ERouters.customer_types,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'create',
                component: CustomerTypeFormComponent,
                data: {
                    name: 'Thêm kiểu khách hàng',
                    icon: 'plus',
                    display: true
                }
            },
            {
                path: 'list',
                component: CustomerTypesListComponent,
                data: {
                    name: 'Danh sách kiểu khách hàng',
                    icon: 'unordered-list',
                    display: true
                }
            },
            {
                path: 'edit',
                component: CustomerTypeFormComponent,
                data: {
                    name: 'Chỉnh sửa kiểu khách hàng',
                    icon: 'unordered-list',
                    display: false
                }
            },
        ] as Routes
    },
};

const redirectRoute: Route = {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
};

@NgModule({
    imports: [RouterModule.forRoot([ROUTER_GROUPS.APP_GROUP, redirectRoute])],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
