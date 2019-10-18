import {Injectable} from '@angular/core';
import {Validators} from '@angular/forms';
import {HelperService} from '../../shared/services/helper.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IPolicy} from '../../interfaces/policy.interface';
import {API_URL, BASE_URL} from '../../resources/static.resource';
import {map, shareReplay} from 'rxjs/operators';
import {IRole} from '../../interfaces/role.interface';
import {IUser} from '../../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class PoliciesService {

    policyFormControl = {
        name: [null, [Validators.required]],
        roles: [[], [Validators.required]]
    };

    policyEditFormControl = {
        id: [null],
        name: [null, [Validators.required]],
        roles: [[], [Validators.required]]
    };

    constructor(
        private helper: HelperService,
        private http: HttpClient,
    ) {
    }

    listPolicies(): Observable<IPolicy[]> {
        return this.http.get<{ datas: IPolicy[] }>(
            `${API_URL}policies`,
            {headers: this.helper.getAuth()})
            .pipe(
                map(({datas}) => datas)
            );
    }

    // listMemberPolicies(): Observable<IPolicy[]> {
    //   return this.http.get<{datas: IPolicy[]}>(
    //       `${BASE_URL}${ERouters.member_groups}/list-member-policies`,
    //       {headers: this.helper.getAuth()}
    //   ).pipe(map(({datas}) => datas));
    // }

    // tslint:disable
    addUser(policy_id: number, user_id: number): Observable<IUser> {
        return this.http.post<{ data: IUser }>(`${API_URL}policies/join/${policy_id}`,
            {userId: user_id},
            {headers: this.helper.getAuth()}
        ).pipe(
            map(({data}) => data)
        );
    };

    delete(id) {
        return this.http.delete(`${API_URL}policies/${id}`,
            {
                headers: this.helper.getAuth()
            });
    }

    create(value: IPolicy): Observable<IPolicy> {
        return this.http.post<{ data: IPolicy }>(`${API_URL}policies`,
            value,
            {
                headers: this.helper.getAuth()
            }
        ).pipe(
            map(({data}) => data)
        );
    }

    single(id: any): Observable<IPolicy> {
        return this.http.get<{ data: IPolicy }>(`${API_URL}policies/${id}`,
            {
                headers: this.helper.getAuth(),
            }).pipe(
            map(({data}) => data)
        );
    }

    edit(value): Observable<IPolicy> {
        return this.http.put<{ data: IPolicy }>(`${API_URL}policies/${value.id}`,
            value,
            {
                headers: this.helper.getAuth()
            }).pipe(
            map(({data}) => data)
        );
    }

    deleteUser(user_id) {
        return this.http.post(`${API_URL}policies/out`, {userId: user_id},
            {
                headers: this.helper.getAuth()
            });
    }

    policyScopes() {
        return this.http.get<{ datas: IRole[] }>(`${API_URL}policies/roles`,
            {
                headers: this.helper.getAuth()
            }).pipe(
            map(({datas}) => datas),
            shareReplay()
        );
    }

    listMembersOfPolicy(policy_id) {
        return this.http.get<{ datas: IUser[] }>(`${API_URL}policies/${policy_id}/users`,
            {
                headers: this.helper.getAuth(),
            });
    }
}
