import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelperService} from '../../shared/services/helper.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {API_URL} from '../../resources/static.resource';
import {map} from 'rxjs/operators';
import {ISchedule} from '../../interfaces/schedule.interface';
import {ICustomer} from '../../interfaces/customer.interface';
import {ICustomerType} from '../../interfaces/customer-type.interface';
import {IOrder} from '../../interfaces/order.interface';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    orderDetail = {
        vehicleCategoryId: [null, [Validators.required]],
        customerTypeId: [null, [Validators.required]],
        quantity: [null, [Validators.required]],
        travelFromId: [null, [Validators.required]],
        travelToId: [null, [Validators.required]],
    };

    constructor(
        private http: HttpClient,
        private helper: HelperService,
        private fb: FormBuilder
    ) {
    }

    generatedFormControl() {
        return {
            customerName: [null, [Validators.required]],
            phoneNumber: [null, [Validators.required]],
            scheduleId: [null, [Validators.required]],
            paidStatus: [null, [Validators.required]],
            orderDetailRequest: this.fb.array(
                [this.addOrderDetailPartFormGroup()]
            ),
        };
    }

    addOrderDetailPartFormGroup(): FormGroup {
        return this.fb.group(this.orderDetail);
    }

    createOrder(value) {
        return this.http.post(`${API_URL}orders`, value, {headers: this.helper.getAuth()})
            .pipe(map(value1 => value1));
    }

    listOrder() {
        return this.http.get<{ datas: IOrder[] }>(`${API_URL}orders`, {headers: this.helper.getAuth()})
            .pipe(map(({datas}) => datas));
    }

    searchOrder(params) {
        return this.http.get<{ datas: IOrder[] }>(`${API_URL}orders/search`, {headers: this.helper.getAuth(), params})
            .pipe(map(({datas}) => datas));
    }

    calculateOrder(value) {
        return this.http.post<{ data: any }>(`${API_URL}orders/calculate`, value, {headers: this.helper.getAuth()});
    }

    singleOrder(id: number) {
        return this.http.get<{ data: IOrder }>(`${API_URL}orders/${id}`, {headers: this.helper.getAuth()})
            .pipe(map(({data}) => data));
    }

    deleteOrder(id: number) {
        return this.http.delete<{ data: IOrder }>(`${API_URL}orders/${id}`, {headers: this.helper.getAuth()})
            .pipe(map(({data}) => data));
    }
}
