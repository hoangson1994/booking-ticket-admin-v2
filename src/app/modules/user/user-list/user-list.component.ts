import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {HelperService} from '../../../shared/services/helper.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {IUser, UserStatus} from '../../../interfaces/user.interface';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  datas: IUser[] = null;
  isLoding: boolean;
  userStatus = UserStatus;

  constructor(
    private userService: UserService,
    private helper: HelperService,
    private notify: NzNotificationService
  ) {
  }

  ngOnInit() {
    this.isLoding = true;
    this.listUser();
  }

  listUser() {
    this.userService.listUser()
      .pipe(
        finalize(() => this.isLoding = false)
      )
      .subscribe({
        next: value => {
          this.datas = value;
        },
        error: err => {
          this.helper.handleError(err);
        }
      });
  }

  deleteUser(index) {
    const selected = this.datas[index];
    selected.isDeleting = true;
    this.userService.deleteUser(selected.id)
      .subscribe({
        next: value => {
          this.datas.splice(index, 1);
          this.notify.success('Thành công', 'Xóa nhân viên thành công');
        },
        error: err => {
          this.helper.handleError(err);
        }
      });
  }
}
