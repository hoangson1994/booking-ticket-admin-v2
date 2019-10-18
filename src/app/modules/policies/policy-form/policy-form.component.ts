import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IRole} from '../../../interfaces/role.interface';
import {PoliciesService} from '../policies.service';
import {HelperService} from '../../../shared/services/helper.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {ERouters} from '../../../resources/static.resource';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.less']
})
export class PolicyFormComponent implements OnInit {

    form: FormGroup;
    isSaving = false;
    policyScopes: IRole[];
    isLoading: boolean;

    constructor(
        public service: PoliciesService,
        private helper: HelperService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private notify: NzNotificationService
    ) {
        this.form = this.fb.group(service.policyFormControl);
    }

    ngOnInit() {
        if (!this.policyScopes) {
            this.policyScopes = [];
            this.listScope();
        } else {
            this.setCheckedForScopes([]);
        }
    }

    onCheckScope(event, index) {
        const formControl = this.form.get('roles');
        const value = this.policyScopes[index].id;
        let formValue = formControl.value as string[];
        if (event) {
            formValue.push(value);
        } else {
            formValue = formValue.filter(item => item !== value);
        }
        this.helper.updateAFormField(formControl, formValue);
    }

    submitForm() {
        this.helper.setDirtyAForm(this.form);
        if (this.form.invalid) {
            return;
        }
        this.isSaving = true;
        this.service
            .create(this.form.value)
            .pipe(finalize(() => this.isSaving = false))
            .subscribe({
                next: value => {
                    this.notify.success('Thành công', 'Thêm nhóm quyền thành công');
                    this.router.navigate([ERouters.list], {relativeTo: this.route.parent});
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

    setCheckedForScopes(checkedArray: string[]) {
        this.policyScopes.forEach(s => {
            s.checked = checkedArray.includes(s.id);
        });
    }

    listScope() {
        this.isLoading = true;
        this.service
            .policyScopes()
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: value => {
                    this.policyScopes = value;
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

}
