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
import {Observable} from 'rxjs';
import {IUser} from '../../../interfaces/user.interface';

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
            this.scheduleService.singleSchedule(this.id)
                .pipe(finalize(() => this.isPost = false))
                .subscribe({
                    next: value => {
                        this.selectedSchedule = value;
                        this.selectedSchedule.scheduleDate = this.selectedSchedule.startTime;
                        this.helper.setValueToForm(this.form, this.selectedSchedule, true);
                    },
                    error: err => {
                        this.helper.handleError(err);
                    }
                });
        }
    }

    onSubmit() {
        this.helper.setDirtyAForm(this.form);
        if (this.form.invalid) {
            return;
        }
        this.isPost = true;
        let observable: Observable<ISchedule> = this.scheduleService.createSchedule(this.form.value);
        if (Object.keys(this.selectedSchedule).length > 0) {
            observable = this.scheduleService.editSchedule(this.selectedSchedule.id, this.form.value);
        }
        observable
            .pipe(finalize(() => this.isSubmit = false))
            .subscribe({
                next: value => {
                    this.notify.success('Thành công',
                        Object.keys(this.selectedSchedule).length > 0 ? 'Sửa lịch thành công' : 'Tạo lịch thành công');
                    this.router.navigate(['/schedules/list-schedule']);
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

    private selectSchedule(id) {

    }

    onEdit() {
        this.helper.setDirtyAForm(this.form);
        this.isPost = true;
        this.scheduleService.editSchedule(this.id, this.form.value)
            .pipe(finalize(() => this.isPost = false))
            .subscribe({
                next: value => {
                    this.notify.success('Thành công', 'Sửa lịch thành công');
                    this.router.navigate(['/schedules/list-schedule']);                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

    getTitle() {
        let title = 'Thêm lịch';
        if (Object.keys(this.selectedSchedule).length > 0) {
            title = 'Sửa lịch';
        }
        return title;
    }
}
