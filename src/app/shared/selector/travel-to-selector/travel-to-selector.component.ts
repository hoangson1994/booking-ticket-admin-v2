import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {IStreet} from '../../../interfaces/street.interface';
import {VoyagesService} from '../../../modules/voyages/voyages.service';
import {HelperService} from '../../services/helper.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {IVoyagePart} from '../../../interfaces/voyage-part.interface';

@Component({
    selector: 'app-travel-to-selector',
    templateUrl: './travel-to-selector.component.html',
    styleUrls: ['./travel-to-selector.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TravelToSelectorComponent),
            multi: true
        }
    ]
})
export class TravelToSelectorComponent implements OnInit, ControlValueAccessor {

    @Input()
    private voyageId: number;

    @Input()
    datas: IVoyagePart[];

    private propagateChange: (_: any) => void;
    //tslint:disable
    private _model;
    to: any;
    @Output() valChange = new EventEmitter<any>();

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
        private service: VoyagesService,
        private helper: HelperService,
    ) {
    }

    ngOnInit() {
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

    takeVoyageAndEmitEvent() {
        if (this.to) {
            this.valChange.emit(this.to);
        }
    }
}
