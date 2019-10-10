import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {AuthService} from '../auth.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {ACCESS_TOKEN_SECRET_KEY} from '../../../resources/static.resource';
import {NzNotificationModule, NzNotificationService} from 'ng-zorro-antd';
import {HelperService} from '../../../shared/services/helper.service';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isPostingForm = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private notify: NzNotificationService,
    private helper: HelperService,
    private router: Router
  ) {
    this.form = this.fb.group(authService.formControl);
  }

  ngOnInit() {
  }

  onSubmit() {
    this.helper.setDirtyAForm(this.form);
    if (this.form.invalid) {
      return;
    }
    this.isPostingForm = true;
    this.authService.login(this.form.value)
      .pipe(
        finalize(() => this.isPostingForm = false)
      )
      .subscribe(
        value => {
          localStorage.setItem(ACCESS_TOKEN_SECRET_KEY, value.accessToken);
          this.notify.success('Thành Công', 'Đăng nhập thành công');
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.helper.handleError(error);
        }
      );
  }
}
