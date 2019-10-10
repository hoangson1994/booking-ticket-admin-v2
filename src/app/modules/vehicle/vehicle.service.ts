import {Injectable} from '@angular/core';
import {IVehicleCategory} from '../../interfaces/vehicle-category.interface';
import {IVehicle} from '../../interfaces/vehicle.interface';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL, BASE_URL} from '../../resources/static.resource';
import {map} from 'rxjs/operators';
import {HelperService} from '../../shared/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  vehicleCategory: IVehicleCategory;
  ivehicle: IVehicle;

  formControlVehicleCategory = {
    name: [null, [Validators.required]],
    seatQuantity: [null, [Validators.required]],
    price: [null, [Validators.required]]
  };

  formControlVehicle = {
    name: [null, [Validators.required]],
    plate: [null, [Validators.required]],
    color: [null, [Validators.required]],
    category_id: [null, [Validators.required]],
  };


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private helper: HelperService
  ) {
  }

  createVehicleCategory(value): Observable<IVehicleCategory> {
    return this.http
      .post<{ data: IVehicleCategory }>(`${API_URL}vehicle-categories`, value,
        {
          headers: this.helper.getAuth()
        })
      .pipe(map(d => d.data));
  }

  createVehicle(value): Observable<IVehicle> {
    return this.http
      .post<{ data: IVehicle }>(`${API_URL}vehicles`, value,
        {
          headers: this.helper.getAuth()
        })
      .pipe(map(d => d.data));
  }

  listVehicleCategories(): Observable<IVehicleCategory[]> {
    return this.http.get<{ datas: IVehicleCategory[] }>(`${API_URL}vehicle-categories`, {
      headers: this.helper.getAuth()
    })
      .pipe(map(({datas}) => datas));

  }

  listVehicle(): Observable<IVehicle[]> {
    return this.http.get<{ datas: IVehicle[] }>(`${API_URL}vehicles`, {
      headers: this.helper.getAuth()
    })
      .pipe(map(({datas}) => datas));
  }

  singleVehicleCategory(id) {
    return this.http.get<{ data: IVehicleCategory }>(
      `${API_URL}vehicle-categories/${id}`,
      {
        headers: this.helper.getAuth(),
      }
    ).pipe(map(({data}) => data));
  }

  singleVehicle(id) {
    return this.http.get<{ data: IVehicle }>(`${API_URL}vehicles/${id}`, {
        headers: this.helper.getAuth(),
      }
    ).pipe(map(({data}) => data));
  }

  editVehicleCategory(value, id) {
    return this.http.put<{ data: IVehicleCategory }>(
      `${API_URL}vehicle-categories/${id}`,
      value,
      {
        headers: this.helper.getAuth(),
      }
    ).pipe(map(({data}) => data));
  }

  editVehicle(value, id) {
    return this.http.put<{ data: IVehicleCategory }>(
      `${API_URL}vehicles/${id}`,
      value,
      {
        headers: this.helper.getAuth(),
      }
    ).pipe(map(({data}) => data));
  }

  deleteVehicleCategory(id) {
    return this.http.delete<{ data: IVehicleCategory }>(
      `${API_URL}vehicle-categories/${id}`,
      {
        headers: this.helper.getAuth(),
      }
    ).pipe(map(({data}) => data));
  }

  deleteVehicle(id) {
    return this.http.delete<{ data: IVehicle }>(
      `${API_URL}vehicles/${id}`,
      {headers: this.helper.getAuth()}
    ).pipe(map(({data}) => data));
  }
}
