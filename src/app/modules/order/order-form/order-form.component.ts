import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {ISchedule} from 'src/app/interfaces/schedule.interface';
import {finalize} from 'rxjs/operators';
import {HelperService} from '../../../shared/services/helper.service';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrderPaidStatus} from '../../../interfaces/order.interface';
import {NzNotificationService} from 'ng-zorro-antd';
import {IVoyagePart} from '../../../interfaces/voyage-part.interface';
import {IVoyage} from '../../../interfaces/voyage.interface';
import {VoyagesService} from '../../voyages/voyages.service';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.less']
})
export class OrderFormComponent implements OnInit {
    orderForm: FormGroup;

    @Input()
    close;
    @Input()
    date: number;
    @Input()
    voyageId: number;
    @Input()
    scheduleTemplateId: number;
    isLoading: boolean;

    tempPrice: any;

    from: any;
    to: any;
    voyageParts: IVoyagePart[];

    orderPaidOptions = this.helper.enumToKeyValue(OrderPaidStatus);
    vehicleCategoryId: number;

    constructor(
        private orderService: OrderService,
        private voyageService: VoyagesService,
        private helper: HelperService,
        private form: FormBuilder,
        private router: Router,
        private notify: NzNotificationService,
    ) {
    }

    ngOnInit() {
        if (this.voyageId) {
            this.voyageService
                .single(this.voyageId)
                .subscribe({
                    next: value => {
                        this.voyageParts = value.voyageParts;
                    },
                    error: err => this.helper.handleError(err)
                });
        }
        this.orderForm = this.form.group(this.orderService.generatedFormControl());
    }

    canChooseFromVoyagePart(): IVoyagePart[] {
        if (!this.to) {
            return this.voyageParts;
        }
        return this.voyageParts.filter((value, index) => {
            const toIndex = this.voyageParts.indexOf(this.to);
            return index <= toIndex;
        });
    }

    canChooseToVoyagePart(): IVoyagePart[] {
        if (!this.from) {
            return this.voyageParts;
        }
        return this.voyageParts.filter((value, index) => {
            const fromIndex = this.voyageParts.indexOf(this.from);
            return index >= fromIndex;
        });
    }

    takeVoyagePartFrom(voyagePart: IVoyagePart, index: number) {

        const travelFrom = this.voyageParts[this.voyageParts.findIndex(part => part.id === voyagePart.id)];
        const orderDetailRequestFormArray = this.orderForm.get('orderDetailRequest') as FormArray;
        const orderDetailRequestFormGroup = orderDetailRequestFormArray.at(index) as FormGroup;
        orderDetailRequestFormGroup.get('travelFromId').setValue(travelFrom.id);
    }

    takeVoyagePartTo(voyagePart: IVoyagePart, index: number) {

        const travelTo = this.voyageParts[this.voyageParts.findIndex(part => part.id === voyagePart.id)];
        const orderDetailRequestFormArray = this.orderForm.get('orderDetailRequest') as FormArray;
        const orderDetailRequestFormGroup = orderDetailRequestFormArray.at(index) as FormGroup;
        orderDetailRequestFormGroup.get('travelToId').setValue(travelTo.id);
    }


    onSubmit() {
        this.helper.setDirtyAForm(this.orderForm);
        if (this.orderForm.invalid) {
            return;
        }
        const parts = this.orderForm.get('orderDetailRequest') as FormArray;
        for (const part of parts.controls) {
            //tslint:disable
            const _part = part as FormGroup;
            this.helper.setDirtyAForm(_part);
            if (_part.invalid) {
                return;
            }
        }
        this.orderService
            .createOrder(this.orderForm.value)
            .subscribe({
                next: value => {
                    this.notify.success('Thành công', 'Đặt chuyến thành công');
                    if(this.close) {
                        this.close();
                    }
                },
                error: err => this.helper.handleError(err)
            });
    }

    addRecord() {
        const formArr = this.orderForm.get('orderDetailRequest') as FormArray;
        formArr.push(this.orderService.addOrderDetailPartFormGroup());
    }

    removeItem(i: number) {
        const orderDetailRequest = this.orderForm.get('orderDetailRequest') as FormArray;
        if (orderDetailRequest.length < 2) {
            return;
        }
        orderDetailRequest.removeAt(i);
    }

    getSchedule(schedule: ISchedule) {
        this.vehicleCategoryId = schedule.vehicleCategoryId;
    }

    tamTinh() {
        this.helper.setDirtyAForm(this.orderForm);
        if (this.orderForm.invalid) {
            return;
        }
        const parts = this.orderForm.get('orderDetailRequest') as FormArray;
        for (const part of parts.controls) {
            //tslint:disable
            const _part = part as FormGroup;
            this.helper.setDirtyAForm(_part);
            if (_part.invalid) {
                return;
            }
        }

        this.orderService
            .calculateOrder(this.orderForm.value)
            .subscribe({
                next: value => {
                   this.tempPrice = value.data.totalPrice;
                },
                error: err => this.helper.handleError(err)
            });
    }
}
