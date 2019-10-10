import {Component, forwardRef, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {IVehicleCategory} from '../../../interfaces/vehicle-category.interface';
import {VehicleService} from '../../../modules/vehicle/vehicle.service';
import {HelperService} from '../../services/helper.service';

@Component({
  selector: 'app-vehicle-category-selector',
  templateUrl: './vehicle-category-selector.component.html',
  styleUrls: ['./vehicle-category-selector.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VehicleCategorySelectorComponent),
      multi: true
    }
  ]
})
export class VehicleCategorySelectorComponent implements OnInit {

  datas: IVehicleCategory[];
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
    private service: VehicleService,
    private helper: HelperService,
  ) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.service
      .listVehicleCategories()
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
