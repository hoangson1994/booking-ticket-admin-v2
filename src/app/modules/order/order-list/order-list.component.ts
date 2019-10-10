import {Component, OnInit} from '@angular/core';
import {ScheduleTemplatesService} from '../../schedule-templates/schedule-templates.service';
import {HelperService} from '../../../shared/services/helper.service';
import {IScheduleTemplate} from '../../../interfaces/schedule-template.interface';
import * as moment from 'moment';
import {finalize} from 'rxjs/operators';
import {ERouters} from '../../../resources/static.resource';
import {IOrder, OrderStatus} from '../../../interfaces/order.interface';
import {OrderService} from '../order.service';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.less']
})
export class OrderListComponent implements OnInit {

    datas: IOrder[];
    loading = true;
    today = moment().startOf('d');

    eRouters = ERouters;
    isLoading: any;
    orderStatus = OrderStatus;

    constructor(
        private service: OrderService,
        private helper: HelperService,
    ) {
    }

    ngOnInit() {
        this.list();
    }

    list() {
        this.service.listOrder()
            .pipe(finalize(() => this.loading = false))
            .subscribe(
                {
                    next: value => {
                        this.datas = value;
                    },
                    error: err => {
                        this.helper.handleError(err);
                    }
                }
            );
    }

    parseDate(startTime: number) {
        return moment(startTime).format('HH:mm DD-MM-YYYY');
    }
}
