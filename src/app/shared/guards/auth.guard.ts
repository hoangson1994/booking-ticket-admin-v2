import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NzNotificationService} from 'ng-zorro-antd';
import {ACCESS_TOKEN_SECRET_KEY, BASE_URL} from '../../resources/static.resource';
import {AuthService} from '../../modules/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private http: HttpClient,
        private router: Router,
        private notify: NzNotificationService,
        private authService: AuthService
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkLogin(state.url);
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(next, state);
    }

    private checkLogin(data): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            const token = localStorage.getItem(ACCESS_TOKEN_SECRET_KEY);
            if (!token) {
                this.redirectToLoginAndNotify();
                return observer.next(false);
            }
            this.authService
                .userData()
                .subscribe({
                    next: value => {
                        // const canAccess = this.authService.canAccessThisRoute(data);
                        // if (!canAccess) {
                        //   this.notify.warning('Truy cập thất bại', 'Bạn không có quyền truy cập vào tài nguyên này');
                        // }
                        // observer.next(canAccess);
                        observer.next(true);
                    },
                    error: err => {
                        localStorage.removeItem(ACCESS_TOKEN_SECRET_KEY);
                        this.redirectToLoginAndNotify();
                        observer.next(false);
                    }
                });
        });
    }

    private redirectToLoginAndNotify() {
        this.router.navigateByUrl('auth/login');
        this.notify.create('warning', 'Bạn chưa đăng nhập', 'Hãy đăng nhập trước khi sử dụng bất cứ tính năng nào');
    }
}
