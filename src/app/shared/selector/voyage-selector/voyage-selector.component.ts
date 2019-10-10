import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {IVoyage} from '../../../interfaces/voyage.interface';
import {VoyagesService} from '../../../modules/voyages/voyages.service';
import {HelperService} from '../../services/helper.service';
import {ScheduleTemplatesService} from '../../../modules/schedule-templates/schedule-templates.service';

@Component({
    selector: 'app-voyage-selector',
    templateUrl: './voyage-selector.component.html',
    styleUrls: ['./voyage-selector.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => VoyageSelectorComponent),
            multi: true
        }
    ]
})
export class VoyageSelectorComponent implements OnInit {
    @Input()
    mode: string;

    @Input()
    disabled = false;

    //tslint:disable
    private _scheduleTemplateId: number;


    get scheduleTemplateId(): number {
        return this._scheduleTemplateId;
    }

    @Input()
    set scheduleTemplateId(value: number) {
        if (this._scheduleTemplateId !== value) {
            this._scheduleTemplateId = value;
            this._data = [];
        }
        if (value) {
            this.disabled = false;
            this.refresh();
        } else {
            this._model = null;
            this.disabled = true;
        }
    }

    private _data: IVoyage[];


    get data(): IVoyage[] {
        return this._data;
    }

    set data(value: IVoyage[]) {
        if (this.data !== value) {
            this._data = value;
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
        private service: VoyagesService,
        private helper: HelperService,
        private scheduleTemplateService: ScheduleTemplatesService
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {

        if (this._scheduleTemplateId) {
            this.scheduleTemplateService
                .single(this._scheduleTemplateId)
                .subscribe({
                    next: value => {
                        this.data = value.voyages;
                    },
                    error: err => this.helper.handleError(err)
                });
        } else {
            this.service
                .list()
                .subscribe({
                    next: value => {
                        this.data = value;
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
        const dataId = this._data.map(d => d.id);
        if (this.mode === 'default') {
            if (!dataId.includes(this._model)) {
                this.model = null;
            }
        } else if(this._model) {
            this.model = this._model.filter(val => dataId.includes(val));
        }
    }
}
