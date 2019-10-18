import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {UserService} from '../user.service';
import {IUser} from '../../../interfaces/user.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ERouters} from '../../../resources/static.resource';
import {IScheduleTemplate} from '../../../interfaces/schedule-template.interface';
import * as moment from 'moment';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.less']
})
export class UserFormComponent implements OnInit {
    user: IUser;
    form: FormGroup;
    selectedValue = null;
    isPost = false;
    isSubmit: boolean;
    id: Params;
    data: IUser;

    constructor(
        private fb: FormBuilder,
        private helper: HelperService,
        private userService: UserService,
        private notify: NzNotificationService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.form = this.fb.group(this.userService.formControl);
    }

    ngOnInit() {
        this.data = {} as IUser;
        if (this.route.snapshot.queryParams && this.route.snapshot.queryParams.id) {
            const id = this.route.snapshot.queryParams.id;
            this.userService.singleUser(id)
                .subscribe({
                    next: value => {
                        this.data = value;
                        this.data.gender = this.data.gender.toString();
                        this.form.get('password').setValidators([]);
                        this.helper.setValueToForm(this.form, this.data, true);
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
        let observable: Observable<IUser> = this.userService.createUser(this.form.value);
        if (Object.keys(this.data).length > 0) {
            observable = this.userService.editUser(this.form.value);
        }
        observable
            .pipe(finalize(() => this.isPost = false))
            .subscribe({
                next: value => {
                    this.notify.success('Thành công',
                        Object.keys(this.data).length > 0 ? 'Sửa nhân viên thành công' : 'Thêm nhân viên thành công');
                    this.router.navigate(['/', 'user', 'list-user']);
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

    getTitle() {
        let title = 'Thêm nhân viên';
        if (Object.keys(this.data).length > 0) {
            title = 'Sửa nhân viên';
        }
        return title;
    }
}
