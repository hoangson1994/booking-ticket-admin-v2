import {Component, OnInit} from '@angular/core';
import {IScheduleTemplate} from '../../../interfaces/schedule-template.interface';
import * as moment from 'moment';
import {ScheduleTemplatesService} from '../../schedule-templates/schedule-templates.service';
import {HelperService} from '../../../shared/services/helper.service';
import {finalize} from 'rxjs/operators';
import {OrderFormComponent} from '../order-form/order-form.component';
import {NzModalService} from 'ng-zorro-antd';
import {IOrderDetail} from '../../../interfaces/order-detail.interface';
import {IOrder} from '../../../interfaces/order.interface';
import {IVoyage} from '../../../interfaces/voyage.interface';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.less']
})
export class OrderCreateComponent implements OnInit {

  datas: IScheduleTemplate[];
  loading = true;
  today = moment().startOf('d');

  constructor(
    private scheduleTemService: ScheduleTemplatesService,
    private helper: HelperService,
    private modalService: NzModalService
  ) {
  }

  ngOnInit() {
    this.listSchedule();
  }

  getOffsetTimeMls(offTime: number): number {
    return this.today.valueOf() + offTime;
  }

  parseOffsetMlsToTime(offTime: number): string {
    const time = this.today.valueOf() + offTime;
    return moment(time).format('HH:mm');
  }

  listSchedule() {
    this.scheduleTemService.list()
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

  showModal(scheduleTemplate: IScheduleTemplate, voyage: IVoyage) {
    const modal = this.modalService.create({
      nzTitle: `Chuyến: ${this.parseOffsetMlsToTime(scheduleTemplate.timeStart)} - ${this.parseOffsetMlsToTime(scheduleTemplate.timeEnd)}
            <p class="mb-0"><small>Tuyến: ${voyage.name}</small></p>
            `,
      nzWidth: 900,
      nzContent: OrderFormComponent,
      nzStyle: {
        top: '5px'
      },
      nzFooter: [
        {
          label: 'Đóng',
          onClick: () => {
            modal.destroy();
          }
        }
      ],
      nzComponentParams: {
        //tslint:disable
        close: () => modal.destroy(),
        date: moment().valueOf(),
        voyageId: voyage.id,
        scheduleTemplateId: scheduleTemplate.id
      },
      nzOnCancel: () => modal.destroy(),
      nzMaskClosable: true,
      nzClosable: true,
      nzClassName: 'large-modal',
    });
  }
}
