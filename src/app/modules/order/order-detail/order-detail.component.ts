import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {HelperService} from '../../../shared/services/helper.service';
import {ActivatedRoute} from '@angular/router';
import {IOrder, OrderStatus} from '../../../interfaces/order.interface';
import {finalize} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.less']
})
export class OrderDetailComponent implements OnInit {
    isLoading: any;
    data: IOrder;
    orderStatus = OrderStatus;

    constructor(
        private service: OrderService,
        private helper: HelperService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.data = {} as IOrder;
        const id = this.route.snapshot.queryParams.id;
        if (id) {
            this.isLoading = true;
            this.service
                .singleOrder(id)
                .pipe(finalize(() => this.isLoading = false))
                .subscribe({
                    next: value => {
                        this.data = value;
                    },
                    error: err => this.helper.handleError(err)
                });
        }
    }

    parseDate(startTime: number) {
        return moment(startTime).format('HH:mm DD-MM-YYYY');
    }

    delete() {
        this.data.isDeleting = true;
        this.service
            .deleteOrder(this.data.id)
            .pipe(finalize(() => this.data.isDeleting = false))
            .subscribe({
                next: value => {
                    this.data = value;
                },
                error: err => this.helper.handleError(err)
            });
    }
}
