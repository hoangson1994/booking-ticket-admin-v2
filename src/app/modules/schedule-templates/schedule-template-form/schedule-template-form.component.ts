import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScheduleTemplatesService} from '../schedule-templates.service';
import {HelperService} from '../../../shared/services/helper.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {IScheduleTemplate} from '../../../interfaces/schedule-template.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ERouters} from '../../../resources/static.resource';

@Component({
    selector: 'app-schedule-template-form',
    templateUrl: './schedule-template-form.component.html',
    styleUrls: ['./schedule-template-form.component.less']
})
export class ScheduleTemplateFormComponent implements OnInit {

    form: FormGroup;
    isSaving = false;
    data: IScheduleTemplate;

    constructor(
        private fb: FormBuilder,
        private service: ScheduleTemplatesService,
        private helper: HelperService,
        private notify: NzNotificationService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.form = this.fb.group(this.service.formControls);
    }

    ngOnInit() {
        this.data = {} as IScheduleTemplate;
        if (this.route.snapshot.queryParams && this.route.snapshot.queryParams.id) {
            const id = this.route.snapshot.queryParams.id;
            this.service.single(id)
                .subscribe({
                    next: value => {
                        this.data = value;
                        const listVoyageIds = this.data.voyages.map(v => v.id);
                        this.data = {...this.data, listVoyageIds};
                        this.helper.setValueToForm(this.form, this.data, true);
                    },
                    error: err => {
                        this.helper.handleError(err);
                    }
                });
        }
    }

    submit() {
        this.helper.setDirtyAForm(this.form);
        if (this.form.invalid) {
            return;
        }
        this.isSaving = true;
        let observable = this.service.create(this.form.value);
        if (Object.keys(this.data).length > 0) {
            observable = this.service.edit(this.form.value);
        }
        observable
            .pipe(finalize(() => this.isSaving = false))
            .subscribe({
                next: value => {
                    this.notify.success('Thành công',
                        Object.keys(this.data).length > 0 ? 'Sửa mẫu lịch thành công' : 'Thêm mẫu lịch thành công');
                    this.router.navigate(['/', ERouters.schedule_templates, ERouters.list]);
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });

    }

    getTitle() {
        let title = 'Thêm mẫu lịch';
        if (Object.keys(this.data).length > 0) {
            title = 'Sửa mẫu lịch';
        }
        return title;
    }
}
