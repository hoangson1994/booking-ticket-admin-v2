import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {VoyagesService} from '../../../modules/voyages/voyages.service';
import {HelperService} from '../../services/helper.service';
import {IStreet} from '../../../interfaces/street.interface';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {IVoyagePart} from '../../../interfaces/voyage-part.interface';

@Component({
    selector: 'app-travel-from-selector',
    templateUrl: './travel-from-selector.component.html',
    styleUrls: ['./travel-from-selector.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TravelFromSelectorComponent),
            multi: true
        }
    ]
})
export class TravelFromSelectorComponent implements OnInit, ControlValueAccessor {

    @Input()
    private voyageId: number;

    @Input()
    datas: IVoyagePart[];

    private propagateChange: (_: any) => void;
    //tslint:disable
    private _model;
    from: IVoyagePart;
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
        if (this.from) {
            this.valChange.emit(this.from);
        }
    }
}
