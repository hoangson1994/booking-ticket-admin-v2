import {Injectable} from '@angular/core';
import {IUser} from '../../interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ACCESS_TOKEN_SECRET_KEY, API_URL, DOMAIN, ERouters, IS_ADMIN, Roles} from '../../resources/static.resource';
import {NzNotificationService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: IUser;
  observable: Observable<IUser>;
  formControl = {
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(4)]]
  };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  login(value): Observable<IUser> {
    if (!this.observable) {
      this.observable = this.http
        .post<{ data: IUser }>(`${DOMAIN}ap/auth/login`, value)
        .pipe(
          map(d => d.data),
          shareReplay()
        );

      this.observable.subscribe({
        next: val => {
          this.user = val;
        },
        error: err => {
          this.observable = null;
        }
      });
    }

    return this.observable;
  }

  userData(): Observable<IUser> {
    if (!this.observable) {
      this.observable = this.http
          .get<{ data: IUser }>(
              `${API_URL}users/user-data`,
              {
                headers: {
                  authorization: localStorage.getItem(ACCESS_TOKEN_SECRET_KEY),
                  'Content-Type': 'application/json'
                }
              }
          )
          .pipe(
              map(d => d.data),
              shareReplay()
          );

      this.observable.subscribe({
        next: value => {
          this.user = value;
        },
        error: err => {
          this.observable = null;
        }
      });
    }
    return this.observable;
  }

  logout() {
    this.user = null;
    this.observable = null;
    localStorage.removeItem(ACCESS_TOKEN_SECRET_KEY);
    this.router.navigate(['/' + ERouters.auth, ERouters.login]);
  }

  canAccessThisRoute(data: {role: Roles}) {
    if ((this.user && this.user.policy.id === IS_ADMIN) || !data || !data.role) {
      return true;
    }
    if (!this.user || !this.user.policy) {
      return false;
    }
    return this.user.policy.roles.map(r => {
      return r.id;
    }).includes(data.role);
  }
}
