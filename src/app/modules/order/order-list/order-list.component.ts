import {Component, OnInit} from '@angular/core';
import {ScheduleTemplatesService} from '../../schedule-templates/schedule-templates.service';
import {HelperService} from '../../../shared/services/helper.service';
import {IScheduleTemplate} from '../../../interfaces/schedule-template.interface';
import * as moment from 'moment';
import {finalize} from 'rxjs/operators';
import {ERouters, ORDER_LIST_STATE_KEY} from '../../../resources/static.resource';
import {IOrder, OrderStatus} from '../../../interfaces/order.interface';
import {OrderService} from '../order.service';
import {OrderParam} from '../order.param';
import {StoreService} from '../../../shared/services/store.service';

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
    orderStatusOptions = this.helper.enumToKeyValue(OrderStatus);
    params: OrderParam;

    constructor(
        private service: OrderService,
        private helper: HelperService,
        private store: StoreService,
    ) {
    }

    ngOnInit() {
        this.params = this.store.get(ORDER_LIST_STATE_KEY, new OrderParam());
        this.search();
    }

    list() {
        this.isLoading = true;
        this.service.listOrder()
            .pipe(finalize(() => this.isLoading = false))
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

    search() {
        this.isLoading = true;
        this.service.searchOrder(this.params)
            .pipe(finalize(() => this.isLoading = false))
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
