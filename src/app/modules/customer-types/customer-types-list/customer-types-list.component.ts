import {Component, OnInit} from '@angular/core';
import {IScheduleTemplate, ScheduleTemplateStatus} from '../../../interfaces/schedule-template.interface';
import * as moment from '../../schedule-templates/schedule-templates-list/schedule-templates-list.component';
import {ERouters} from '../../../resources/static.resource';
import {ScheduleTemplatesService} from '../../schedule-templates/schedule-templates.service';
import {HelperService} from '../../../shared/services/helper.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {CustomerTypeStatus, ICustomerType} from '../../../interfaces/customer-type.interface';
import {CustomerTypesService} from '../customer-types.service';

@Component({
    selector: 'app-customer-types-list',
    templateUrl: './customer-types-list.component.html',
    styleUrls: ['./customer-types-list.component.less']
})
export class CustomerTypesListComponent implements OnInit {

    datas: ICustomerType[];
    isLoading = false;
    statuses = CustomerTypeStatus;
    eRouters = ERouters;

    constructor(
        private service: CustomerTypesService,
        private helper: HelperService,
        private notify: NzNotificationService
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.isLoading = true;
        this.service.list()
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: value => {
                    this.datas = value;
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

    doDelete(i: number) {
        const selected = this.datas[i];
        selected.isDeleting = true;
        this.service.delete(selected.id)
            .pipe(finalize(() => selected.isDeleting = false))
            .subscribe({
                next: value => {
                    this.datas.splice(i, 1);
                    this.notify.success('Thành công', 'Xóa thành công');
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

}
