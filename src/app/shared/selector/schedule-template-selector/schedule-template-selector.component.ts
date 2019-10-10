import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {HelperService} from '../../services/helper.service';
import {ScheduleTemplatesService} from '../../../modules/schedule-templates/schedule-templates.service';
import {IScheduleTemplate} from '../../../interfaces/schedule-template.interface';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule-template-selector',
  templateUrl: './schedule-template-selector.component.html',
  styleUrls: ['./schedule-template-selector.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScheduleTemplateSelectorComponent),
      multi: true
    }
  ]
})
export class ScheduleTemplateSelectorComponent implements OnInit, ControlValueAccessor {
  @Input()
  mode: string;
  today = moment().startOf('d');
  datas: IScheduleTemplate[];
  private propagateChange: (_: any) => void;

  //tslint:disable
  private _model;
  get model() {
    return this._model;
  }

  set model(value) {
    if (this._model !== value) {
      this._model = value;
      if (this.propagateChange) {
        this.propagateChange(this._model);
      }
    }
  }

  parseOffsetMlsToTime(offTime: number): string {
    const time = this.today.valueOf() + offTime;
    return moment(time).format('HH:mm');
  }

  constructor(
    private scheduleT: ScheduleTemplatesService,
    private helper: HelperService
  ) {
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.scheduleT.list().subscribe({
      next: value => this.datas = value,
      error: err => this.helper.handleError(err)
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this._model = obj;
  }
}
