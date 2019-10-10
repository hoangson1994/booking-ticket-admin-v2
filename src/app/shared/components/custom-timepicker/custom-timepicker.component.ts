import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {HelperService} from '../../services/helper.service';
import * as moment from 'moment';

@Component({
    selector: 'app-custom-timepicker',
    templateUrl: './custom-timepicker.component.html',
    styleUrls: ['./custom-timepicker.component.less']
})
export class CustomTimepickerComponent implements OnInit, OnChanges {

    @Input() dateInput;

    @Input() dateControl: AbstractControl;
    date = null;

    constructor(
        private helper: HelperService
    ) {
    }

    ngOnInit() {
    }

    onChange(ev) {
        let value = ev;
        if (ev) {
            const time = moment(ev);
            value = (time.get('h') * 60 + time.get('m')) * 60 * 1000;
        }
        this.helper.updateAFormField(this.dateControl, value);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.dateInput) {
            const today = moment();
            this.date = today.startOf('d').add(this.dateInput, 'ms').toDate();
        }
    }

}
