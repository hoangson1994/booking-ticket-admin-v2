import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ISchedule} from '../../../interfaces/schedule.interface';
import {ScheduleService} from '../../../modules/schedules/schedule.service';
import {HelperService} from '../../services/helper.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'app-schedule-selector',
    templateUrl: './schedule-selector.component.html',
    styleUrls: ['./schedule-selector.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ScheduleSelectorComponent),
            multi: true
        }
    ]
})
export class ScheduleSelectorComponent implements OnInit, ControlValueAccessor {
    @Input()
    mode: string;

    //tslint:disable
    @Input()
    voyage_id: number;

    @Input()
    date: number;

    @Input()
    schedule_template_id: number;

    @Output()
    emitSchedule: EventEmitter<any> = new EventEmitter();

    public sendSchedule(schedule: any) {
        this.emitSchedule.emit(schedule);
    }

    today = moment().startOf('d');
    datas: ISchedule[];
    private propagateChange: (_: any) => void;

    //tslint:disable
    private _model;
    get model() {
        return this._model;
    }

    parseMlsToTime(time: number): string {
        return moment(time).format('HH:mm YYYY-MM-DD');
    }

    set model(value) {
        if (this._model !== value) {
            this._model = value;
            if (this.propagateChange) {
                this.propagateChange(this._model);
                this.sendSchedule(this.datas.find((schedule) => schedule.id === value))
            }
        }
    }

    constructor(
        private scheduleService: ScheduleService,
        private helper: HelperService,
    ) {
    }

    ngOnInit() {
        this.listSchedule();
    }

    listSchedule() {
        if (this.voyage_id && this.date && this.schedule_template_id) {
            const params = {
                voyage_id: this.voyage_id,
                date: this.date,
                schedule_template_id: this.schedule_template_id
            };
            this.scheduleService.searchSchedule(params)
                .subscribe({
                    next: value => {
                        this.datas = value;
                    },
                    error: err => {
                        this.helper.handleError(err);
                    }
                });
        }

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
