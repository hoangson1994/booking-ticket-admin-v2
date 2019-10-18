import { Component, OnInit } from '@angular/core';
import {ERouters, ORDER_LIST_STATE_KEY} from '../../resources/static.resource';
import {DashboardService} from './dashboard.service';
import {Router} from '@angular/router';
import {IOrderSummaryStatistic} from '../../interfaces/order-summary-statistic.interface';
import {ISummaryInput} from '../analysis-summary/summary-input';
import {OrderParam} from '../../modules/order/order.param';
import {StoreService} from '../../shared/services/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  isLoading = false;
  iconUser = 'car';
  eRouter = ERouters;
  constructor(
      public service: DashboardService,
      public store: StoreService,
      private router: Router,
  ) { }

  async ngOnInit() {
    await this.refresh();
  }

  async refresh() {
    this.isLoading = true;
    await this.service.refresh();
    this.isLoading = false;
  }

  getSummaryInput(data: IOrderSummaryStatistic): ISummaryInput {
    const result = {
      name: 'Chuyến ' + (data.status === 1 ? 'hoàn thành' : 'bị hủy'),
      value: data.total,
      bottom_name: '',
      bottom_value: 0
    } as ISummaryInput;

    return result;
  }

  async routerLinkOrder(data: IOrderSummaryStatistic) {
    const params = new OrderParam();
    params.status = data.status ? data.status : null;
    this.store.set(ORDER_LIST_STATE_KEY, params);
    await this.router.navigate(['/', 'order', 'list-order']);
  }
}
