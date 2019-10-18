import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IPolicy} from '../../../interfaces/policy.interface';
import {IRole} from '../../../interfaces/role.interface';
import {PoliciesService} from '../policies.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HelperService} from '../../../shared/services/helper.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-policy-edit-form',
    templateUrl: './policy-edit-form.component.html',
    styleUrls: ['./policy-edit-form.component.less']
})
export class PolicyEditFormComponent implements OnInit {

    form: FormGroup;
    isLoading = false;
    isSaving = false;
    addUserModalVisible = false;
    selectedUser;
    isAddingUser = false;
    id: number;
    data: IPolicy;
    policyScopes: IRole[];

    constructor(
        public service: PoliciesService,
        private route: ActivatedRoute,
        private router: Router,
        private helper: HelperService,
        private fb: FormBuilder,
        private notify: NzNotificationService
    ) {
        this.form = this.fb.group(service.policyEditFormControl);
    }

    async ngOnInit() {

        const id = this.route.snapshot.queryParams.id;
        console.log(id);
        if (!id) {
            await this.router.navigate(['policies', 'list'], {relativeTo: this.route.parent});
            return;
        }
        this.id = id;
        this.policyScopes = [];
        this.isLoading = true;
        this.listScope();

        // this.refresh();
    }

    submitForm() {
        this.helper.setDirtyAForm(this.form);

        if (this.form.invalid) {
            return;
        }

        this.isSaving = true;
        console.log(this.form.value);
        this.service
            .edit(this.form.value)
            .subscribe({
                next: value => {
                    this.router.navigate(['list'], {relativeTo: this.route.parent});
                    this.notify.success('Thành công', 'Sửa nhóm quyền thành công');
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

    refresh() {
        this.service
            .single(this.id)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: value => {
                    this.data = value;
                    this.helper.setValueToForm(this.form, this.data);
                    const aScopes = this.data.roles.map(r => {
                        return r.id;
                    });
                    this.helper.updateAFormField(this.form.get('roles'), aScopes);
                    this.setCheckedForScopes(this.form.get('roles').value);
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

    onCheckScope(event, index: number) {
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

    // async searchUser(event) {
    //   this.employeesService.requestParams.search = event;
    //   await this.employeesService.refresh();
    // }

    setCheckedForScopes(checkedArray: string[]) {
        this.policyScopes.forEach(s => {
            s.checked = checkedArray.includes(s.id);
        });
    }

    listScope() {
        this.service
            .policyScopes()
            .subscribe({
                next: value => {
                    this.policyScopes = value;
                    this.refresh();
                },
                error: err => {
                    this.helper.handleError(err);
                    this.isLoading = false;
                }
            });
    }

}
