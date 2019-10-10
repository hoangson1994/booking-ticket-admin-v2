import {Injectable} from '@angular/core';
import {Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HelperService} from '../../shared/services/helper.service';
import {IScheduleTemplate} from '../../interfaces/schedule-template.interface';
import {API_URL} from '../../resources/static.resource';
import {map} from 'rxjs/operators';
import {ICustomerType} from '../../interfaces/customer-type.interface';

@Injectable({
    providedIn: 'root'
})
export class CustomerTypesService {

    formControls = {
        id: [null],
        name: [null, [Validators.required]],
        description: [null, []],
        discount: [null, [Validators.required]],
    };

    constructor(
        private http: HttpClient,
        private helper: HelperService
    ) {
    }

    create(value: ICustomerType) {
        return this.http.post(`${API_URL}customer-types`, value,
            {
                headers: this.helper.getAuth()
            }
        );
    }

    list() {
        return this.http.get<{ datas: ICustomerType[] }>(`${API_URL}customer-types`,
            {headers: this.helper.getAuth()}
        )
            .pipe(map(({datas}) => datas));
    }

    delete(id: any) {
        return this.http.delete(`${API_URL}customer-types/${id}`, {headers: this.helper.getAuth()});
    }

    single(id: any) {
        return this.http.get<{ data: ICustomerType }>(`${API_URL}customer-types/${id}`,
            {headers: this.helper.getAuth()}
        )
            .pipe(map(({data}) => data));
    }

    edit(value) {
        return this.http.put(`${API_URL}customer-types/${value.id}`,
            value,
            {
                headers: this.helper.getAuth()
            });
    }
}
