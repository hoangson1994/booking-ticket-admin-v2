import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../resources/static.resource';
import {shareReplay} from 'rxjs/operators';
import {IDistrict} from '../../interfaces/district.interface';
import {IStreet} from '../../interfaces/street.interface';
import {IProvince} from '../../interfaces/province.interface';
import {HelperService} from './helper.service';

@Injectable({
    providedIn: 'root'
})
export class RegionService {


    constructor(
        private http: HttpClient,
        private helper: HelperService,
    ) {
    }

    provinces() {
        return this.http.get<{ datas: IProvince[] }>(`${API_URL}region/provinces`,
            {
                headers: this.helper.getAuth()
            })
            .pipe(shareReplay());
    }

    //tslint:disable
    districts(province_id) {
        return this.http.get<{ datas: IDistrict[] }>(`${API_URL}region/districts`,
            {
                params: {provinceId: province_id},
                headers: this.helper.getAuth()
            }
        );
    }

    streets(district_id) {
        return this.http.get<{ datas: IStreet[] }>(`${API_URL}region/streets`,
            {
                params: {districtId: district_id},
                headers: this.helper.getAuth()
            }
        );
    }
}
