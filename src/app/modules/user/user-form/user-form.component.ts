import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {UserService} from '../user.service';
import {IUser} from '../../../interfaces/user.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {getLocaleTimeFormat} from '@angular/common';
import {NzNotificationService} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private userService: UserService,
    private notify: NzNotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group(this.userService.formControl);
    this.activatedRoute.params.subscribe({
      next: value => {
        this.id = value.id;
        if (this.id !== undefined) {
          this.isSubmit = false;
          this.selectUser(this.id);
        }
      },
      error: err => {
        this.helper.handleError(err);
      }
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    this.isPost = true;
    this.userService.createUser(this.form.value)
      .pipe(finalize(() => this.isPost = false))
      .subscribe({
        next: value => {
          this.notify.success('Thành công', 'Thêm nhân viên thành công');
        },
        error: err => {
          this.helper.handleError(err);
        }
      });
  }

  private selectUser(id) {
    this.userService.singleUser(id)
      .subscribe({
        next: value => {
          this.helper.setValueToForm(this.form, value);
        },
        error: err => {
          this.helper.handleError(err);
        }
      });
  }
}
