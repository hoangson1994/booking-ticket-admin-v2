import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {HelperService} from '../../shared/services/helper.service';
import {API_URL} from '../../resources/static.resource';
import {map} from 'rxjs/operators';
import {ISchedule} from '../../interfaces/schedule.interface';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {
    schedule: ISchedule[];
    formControl = {
        vehicleId: [null, [Validators.required]],
        vehicleCategoryId: [null, [Validators.required]],
        driverId: [null, [Validators.required]],
        voyageId: [null, [Validators.required]],
        scheduleTemplateId: [null, [Validators.required]],
        scheduleDate: [null, [Validators.required]],
    };

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private helper: HelperService
    ) {
    }

    createSchedule(value) {
        return this.http.post<{ data: ISchedule }>(`${API_URL}schedules`, value, {
            headers: this.helper.getAuth()
        })
            .pipe(map(({data}) => data));
    }

    listSchedule(): Observable<ISchedule[]> {
        return this.http.get<{ datas: ISchedule[] }>(`${API_URL}schedules`, {
            headers: this.helper.getAuth(),
        })
            .pipe(map(({datas}) => datas));
    }

    singleSchedule(id) {
        return this.http.get<{ data: ISchedule }>(`${API_URL}schedules/${id}`,
            {headers: this.helper.getAuth()}
        ).pipe(
            map(({data}) => data));
    }

    deleteSchedule(id) {
        return this.http.delete<{ data: ISchedule }>(`${API_URL}schedules/${id}`,
            {headers: this.helper.getAuth()}
        ).pipe(
            map(({data}) => data));
    }

    editSchedule(id, value) {
        return this.http.put<{ data: ISchedule }>(`${API_URL}schedules/${id}`, value,
            {headers: this.helper.getAuth()}
        ).pipe(
            map(({data}) => data));
    }

    searchSchedule(params: any): Observable<ISchedule[]> {
        return this.http.get<{ datas: ISchedule[] }>(`${API_URL}schedules/search`, {
            headers: this.helper.getAuth(),
            params
        })
            .pipe(map(({datas}) => datas));
    }
}
