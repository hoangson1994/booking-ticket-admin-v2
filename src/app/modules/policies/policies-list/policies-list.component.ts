import {Component, OnInit} from '@angular/core';
import {IPolicy, PolicyStatus} from '../../../interfaces/policy.interface';
import {ERouters} from '../../../resources/static.resource';
import {PoliciesService} from '../policies.service';
import {HelperService} from '../../../shared/services/helper.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-policies-list',
    templateUrl: './policies-list.component.html',
    styleUrls: ['./policies-list.component.less']
})
export class PoliciesListComponent implements OnInit {

    datas: IPolicy[];
    eRouters = ERouters;
    isLoading = false;
    policyStatus = PolicyStatus;
    policyStatusOptions = this.helper.enumToKeyValue(PolicyStatus);

    addUserModalVisible = false;
    selectedPolicy: number;
    selectedUser;
    isSavingUser = false;

    constructor(
        public service: PoliciesService,
        private helper: HelperService,
        private notify: NzNotificationService,
    ) {
    }

    async ngOnInit() {
        this.refresh();
    }

    async refresh() {
        this.isLoading = true;
        this.service
            .listPolicies()
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: value => {
                    this.datas = value;
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

    delete(i: number) {
        const selected = this.datas[i];
        selected.isDeleting = true;
        this.service.delete(selected.id)
            .pipe(finalize(() => selected.isDeleting = false))
            .subscribe({
                next: value => {
                    this.datas.splice(i, 1);
                    this.notify.success('Thành công', 'Xóa quyền thành công');
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

}
