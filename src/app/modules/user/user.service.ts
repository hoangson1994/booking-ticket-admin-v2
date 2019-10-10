import {Injectable} from '@angular/core';
import {IUser} from '../../interfaces/user.interface';
import {Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {IVehicle} from '../../interfaces/vehicle.interface';
import {API_URL} from '../../resources/static.resource';
import {HelperService} from 'src/app/shared/services/helper.service';
import {finalize, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser;

  formControl = {
    email: [null, [Validators.email, Validators.required]],
    password: [null, [Validators.required]],
    name: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    address: [null, [Validators.required]],
    avatar: [null, [Validators.required]],
    birthday: [null, [Validators.required]],
    gender: [null, [Validators.required]],
  };

  constructor(
    private http: HttpClient,
    private helper: HelperService
  ) {
  }

  createUser(value) {
    return this.http.post<{ data: IVehicle }>(`${API_URL}users/create`,
      value, {headers: this.helper.getAuth()}
    ).pipe(
      map(d => d.data)
    )
      ;
  }

  listUser(): Observable<IUser[]> {
    return this.http.get<{ datas: IUser[] }>(`${API_URL}users/list`, {
      headers: this.helper.getAuth()
    })
      .pipe(map(({datas}) => datas));
  }

  singleUser(id): Observable<IUser> {
    return this.http.get<{ data: IUser }>(`${API_URL}users/user-data?id=${id}`, {
      headers: this.helper.getAuth()
    })
      .pipe(map(({data}) => data));
  }

  deleteUser(id): Observable<IUser> {
    return this.http.get<{ data: IUser }>(`${API_URL}users/delete?id=${id}`, {
      headers: this.helper.getAuth()
    })
      .pipe(map(({data}) => data));
  }

  editUser(id, value): Observable<IUser> {
    return this.http.post<{ data: IUser }>(`${API_URL}users/edit?id=${id}`, value, {
      headers: this.helper.getAuth()
    })
      .pipe(map(({data}) => data));
  }
}
