import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../../interfaces/user.interface';
import {PoliciesService} from '../policies.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {HelperService} from '../../../shared/services/helper.service';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-members-list',
    templateUrl: './members-list.component.html',
    styleUrls: ['./members-list.component.less']
})
export class MembersListComponent implements OnInit {

    datas: IUser[];

    //tslint:disable
    @Input()
    policy_id: number;

    addUserModalVisible: any;
    selectedUser: any;
    isAddingUser: any;
    meta: any;
    // params: MembersListParams;
    isLoading = false;

    constructor(
        private service: PoliciesService,
        private notify: NzNotificationService,
        private helper: HelperService,
        private modalService: NzModalService
    ) {
    }

    ngOnInit() {
        if (this.policy_id) {
            this.refresh();
        }
    }

    addUser(userId: number) {
        this.isAddingUser = true;
        this.service
            .addUser(this.policy_id, userId)
            .pipe(finalize(() => this.addUserModalVisible = false))
            .subscribe({
                next: value => {
                    this.datas.push(value);
                    this.notify.success('Thành công', 'Thêm nhân viên vào nhóm quyền thành công');
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
        this.isAddingUser = false;
    }

    deleteUser(i: number) {
        const selected = this.datas[i];
        selected.isDeleting = true;
        this.service
            .deleteUser(selected.id)
            .subscribe({
                next: value => {
                    this.datas.splice(i, 1);
                    this.notify.success('Thành công', 'Loại thành viên khỏi nhóm quyền thành công');
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

    refresh(event?) {
        if (event && event.key !== 'Enter') {
            return;
        }
        this.isLoading = true;

        this.service
            .listMembersOfPolicy(this.policy_id)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: value => {
                    this.datas = value.datas;
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });

    }

}
