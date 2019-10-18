import { Injectable } from '@angular/core';
import {IDashboardData} from '../../interfaces/dashboard.interface';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {HelperService} from '../../shared/services/helper.service';
import {API_URL} from '../../resources/static.resource';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  data: IDashboardData;

  //tslint:disable
  private _fromTime: Date;
  private _toTime: Date;

  get fromTime(): Date {
    return this._fromTime;
  }
  set fromTime(value: Date) {
    this._fromTime = value;
    if (value !== null) {
      this.requestParams.from = moment(value).startOf('h').valueOf();
    } else {
      this.requestParams.from =  moment().startOf('month').valueOf();
    }
  }

  get toTime(): Date {
    return this._toTime;
  }
  set toTime(value: Date) {
    this._toTime = value;
    if (value !== null) {
      this.requestParams.to =  moment(value).endOf('d').valueOf();
    } else {
      this.requestParams.to = moment().valueOf();
    }
  }

  requestParams = {
    from: moment().startOf('month').valueOf(),
    to: moment().valueOf()
  };

  revenueChartData: any[] = [];

  constructor(
      private http: HttpClient,
      private helper: HelperService,
  ) { }

  async refresh() {
    try {
      const res: any =
          await this
              .http
              .get(`${API_URL}statistics`, {headers: this.helper.getAuth(), params: this.requestParams as any})
              .toPromise();
      this.data = res.data;
      this.revenueChartData = this.getRevenueChartData();
    } catch (e) {
      this.helper.handleError(e);
    }
  }

  getRevenueChartData() {
    if (this.data && this.data.revenueStatistics) {
      return this.data.revenueStatistics.map(item => {
        if (item.length > 1) {
          return {
            name: moment(item[0] + ' 00:00:00', 'YYYY-MM-DD').toDate(),
            value: Number(item[1])
          };
        }
      });
    }
    return [];
  }
}
