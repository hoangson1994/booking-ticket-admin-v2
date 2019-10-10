import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../../vehicle/vehicle.service';
import {UserService} from '../../user/user.service';
import {VoyagesService} from '../../voyages/voyages.service';
import {ScheduleTemplatesService} from '../../schedule-templates/schedule-templates.service';
import {ScheduleService} from '../schedule.service';
import {HelperService} from '../../../shared/services/helper.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import * as moment from 'moment';
import {ISchedule} from '../../../interfaces/schedule.interface';

@Component({
    selector: 'app-schedules-form',
    templateUrl: './schedules-form.component.html',
    styleUrls: ['./schedules-form.component.less']
})
export class SchedulesFormComponent implements OnInit {

    form: FormGroup;
    isPost: boolean;
    isSubmit = true;
    id: Params;
    selectedSchedule: ISchedule;

    constructor(
        private vehicleService: VehicleService,
        private userService: UserService,
        private voyageService: VoyagesService,
        private scheduleTemService: ScheduleTemplatesService,
        private scheduleService: ScheduleService,
        private helper: HelperService,
        private fb: FormBuilder,
        private notify: NzNotificationService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.form = this.fb.group(scheduleService.formControl);
    }

    ngOnInit() {
        this.selectedSchedule = {} as ISchedule;
        this.id = this.activatedRoute.snapshot.queryParams.id;
        if (this.id !== undefined) {
            this.isSubmit = false;
            this.selectSchedule(this.id);
        }
    }

    onSubmit() {
        this.helper.setDirtyAForm(this.form);
        if (this.form.invalid) {
            return;
        }
        this.isPost = true;
        this.scheduleService
            .createSchedule(this.form.value)
            .pipe(finalize(() => this.isSubmit = false))
            .subscribe({
                next: value => {
                    this.notify.success('Thành công', 'Tạo lịch thành công');
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

    private selectSchedule(id) {
        this.scheduleService.singleSchedule(id)
            .pipe(finalize(() => this.isPost = false))
            .subscribe({
                next: value => {
                    this.selectedSchedule = value;
                    this.helper.setValueToForm(this.form, value);
                    console.log(value);
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

    onEdit() {
        this.helper.setDirtyAForm(this.form);
        this.isPost = true;
        this.scheduleService.editSchedule(this.id, this.form.value)
            .pipe(finalize(() => this.isPost = false))
            .subscribe({
                next: value => {
                    this.notify.success('Thành công', 'Sửa lịch thành công');
                    // this.router.navigate(['/vehicles/vehicle-list']);
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }
}
