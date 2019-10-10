import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {IStreet} from '../../../interfaces/street.interface';
import {VoyagesService} from '../../../modules/voyages/voyages.service';
import {HelperService} from '../../services/helper.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ICustomerType} from '../../../interfaces/customer-type.interface';
import {CustomerTypesService} from '../../../modules/customer-types/customer-types.service';

@Component({
    selector: 'app-customer-type-selector',
    templateUrl: './customer-type-selector.component.html',
    styleUrls: ['./customer-type-selector.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomerTypeSelectorComponent),
            multi: true
        }
    ]
})
export class CustomerTypeSelectorComponent implements OnInit, ControlValueAccessor {

    datas: ICustomerType[];

    private propagateChange: (_: any) => void;
    //tslint:disable
    private _model;
    get model() {
        return this._model;
    }

    set model(value) {
        if (this._model !== value) {
            this._model = value;
            if (this.propagateChange) {
                this.propagateChange(this._model);
            }
        }
    }

    constructor(
        private service: CustomerTypesService,
        private helper: HelperService,
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {

        this.service
            .list()
            .subscribe({
                next: value => {
                    this.datas = value;
                },
                error: err => this.helper.handleError(err)
            });
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
        this._model = obj;
    }
}
