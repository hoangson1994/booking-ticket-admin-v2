import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import {HelperService} from '../../services/helper.service';

@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.less']
})
export class CustomDatepickerComponent implements OnInit, OnChanges {
  @Input()
  dateControl: AbstractControl;
  @Input()
  dateInput: any;

  date: any;

  constructor(
    private helper: HelperService,
  ) {
  }

  ngOnInit() {
  }

  onChange(ev: any) {
    let value = ev;
    if (ev) {
      value = moment(ev).valueOf();
    }
    console.log(value);
    this.helper.updateAFormField(this.dateControl, value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dateInput) {
      this.date = moment(this.dateInput).toDate();
    }
  }
}
