import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HelperService} from '../../../shared/services/helper.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {ERouters} from '../../../resources/static.resource';
import {CustomerTypesService} from '../customer-types.service';
import {ICustomerType} from '../../../interfaces/customer-type.interface';

@Component({
    selector: 'app-customer-type-form',
    templateUrl: './customer-type-form.component.html',
    styleUrls: ['./customer-type-form.component.less']
})
export class CustomerTypeFormComponent implements OnInit {

    form: FormGroup;
    isSaving = false;
    data: ICustomerType;

    constructor(
        private fb: FormBuilder,
        private service: CustomerTypesService,
        private helper: HelperService,
        private notify: NzNotificationService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.form = this.fb.group(this.service.formControls);
    }

    ngOnInit() {
        this.data = {} as ICustomerType;
        if (this.route.snapshot.queryParams && this.route.snapshot.queryParams.id) {
            const id = this.route.snapshot.queryParams.id;
            this.service.single(id)
                .subscribe({
                    next: value => {
                        this.data = value;
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
                        Object.keys(this.data).length > 0 ? 'Sửa thành công' : 'Thêm thành công');
                    this.router.navigate(['/', ERouters.customer_types, ERouters.list]);
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });

    }
}
