import {Injectable} from '@angular/core';
import {Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {IScheduleTemplate} from '../../interfaces/schedule-template.interface';
import {API_URL} from '../../resources/static.resource';
import {HelperService} from '../../shared/services/helper.service';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ScheduleTemplatesService {

    formControls = {
        id: [null],
        timeStart: [null, [Validators.required]],
        timeEnd: [null, [Validators.required]],
        listVoyageIds: [null, [Validators.required]],
    };

    constructor(
        private http: HttpClient,
        private helper: HelperService
    ) {
    }

    create(value: IScheduleTemplate) {
        return this.http.post(`${API_URL}schedule-templates`, value,
            {
                headers: this.helper.getAuth()
            }
        );
    }

    list() {
        return this.http.get<{datas: IScheduleTemplate[]}>(`${API_URL}schedule-templates`,
            {headers: this.helper.getAuth()}
            )
            .pipe(map(({datas}) => datas));
    }

    delete(id: any) {
        return this.http.delete(`${API_URL}schedule-templates/${id}`, {headers: this.helper.getAuth()});
    }

    single(id: any) {
        return this.http.get<{data: IScheduleTemplate}>(`${API_URL}schedule-templates/${id}`,
            {headers: this.helper.getAuth()}
            )
            .pipe(map(({data}) => data));
    }

    edit(value) {
        return this.http.put(`${API_URL}schedule-templates/${value.id}`,
            value,
            {
                headers: this.helper.getAuth()
            });
    }
}
