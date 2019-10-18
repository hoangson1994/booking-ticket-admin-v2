import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HelperService} from '../../shared/services/helper.service';
import {API_URL} from '../../resources/static.resource';
import {IVoyage} from '../../interfaces/voyage.interface';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class VoyagesService {

    voyagePartFormControl = {
        fromId: [null, [Validators.required]],
        toId: [null, [Validators.required]],
        distance: [null, [Validators.required, Validators.min(0)]]
    };

    constructor(
        private http: HttpClient,
        private helper: HelperService,
        private fb: FormBuilder
    ) {
    }

    generatedFormControl() {
        return {
            name: [null, [Validators.required]],
            voyagePartRequests: this.fb.array([
                this.addVoyagePartFormGroup()
            ])
        };
    }

    addVoyagePartFormGroup(): FormGroup {
        return this.fb.group(this.voyagePartFormControl);
    }

    create(value) {
        return this.http.post(`${API_URL}voyages`, value, {headers: this.helper.getAuth()});
    }

    list() {
        return this.http.get<{datas: IVoyage[]}>(`${API_URL}voyages`,
            {headers: this.helper.getAuth()}
        ).pipe(map(({datas}) => datas));
    }

    single(id: number) {
        return this.http.get<{data: IVoyage}>(`${API_URL}voyages/${id}`,
            {headers: this.helper.getAuth()}
        ).pipe(map(({data}) => data));
    }

    delete(id: number) {
        return this.http.delete<{data: IVoyage}>(`${API_URL}voyages/${id}`,
            {headers: this.helper.getAuth()}
        ).pipe(map(({data}) => data));
    }

    getFromAndToOfVoyage(voyageId: number): any {
        return this.http.get(`${API_URL}voyages/${voyageId}/part`,
            {
                headers: this.helper.getAuth()
            });
    }
}
