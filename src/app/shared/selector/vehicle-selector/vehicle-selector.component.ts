import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {IVehicle} from '../../../interfaces/vehicle.interface';
import {VehicleService} from '../../../modules/vehicle/vehicle.service';
import {HelperService} from '../../services/helper.service';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {IVoyage} from '../../../interfaces/voyage.interface';

@Component({
    selector: 'app-vehicle-selector',
    templateUrl: './vehicle-selector.component.html',
    styleUrls: ['./vehicle-selector.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => VehicleSelectorComponent),
            multi: true
        }
    ]
})
export class VehicleSelectorComponent implements OnInit {
    @Input()
    mode: string;

    @Input()
    disabled = false;
    //tslint:disable
    private _vehicleCategoryId: number;

    get vehicleCategoryId(): number {
        return this._vehicleCategoryId;
    }

    @Input()
    set vehicleCategoryId(value: number) {
        if (this._vehicleCategoryId !== value) {
            this._vehicleCategoryId = value;
            this._datas = [];
        }
        if (value) {
            this.disabled = false;
            this.refresh();
        } else {
            this._model = null;
            this.disabled = true;
        }
    }

    _datas: IVehicle[];
    get datas(): IVehicle[] {
        return this._datas;
    }

    set datas(value: IVehicle[]) {
        if (this.datas !== value) {
            this._datas = value;
            this.matchModelWithDatasAndReset();
        }
    }

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
        private vehicleService: VehicleService,
        private helper: HelperService
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        if (this._vehicleCategoryId) {
            this.vehicleService.listVehicleByVehicleCategory(this._vehicleCategoryId).subscribe({
                next: value => {
                    this.datas = value;
                },
                error: err => this.helper.handleError(err)
            });
        } else {
            this.vehicleService
                .listVehicle()
                .subscribe({
                    next: value => {
                        this.datas = value;
                    },
                    error: err => this.helper.handleError(err)
                });
        }
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

    private matchModelWithDatasAndReset() {
        const dataId = this._datas.map(d => d.id);
        if (this.mode === 'default') {
            if (!dataId.includes(this._model)) {
                this.model = null;
            }
        } else if (this._model) {
            this.model = this._model.filter(val => dataId.includes(val));
        }
    }
}
