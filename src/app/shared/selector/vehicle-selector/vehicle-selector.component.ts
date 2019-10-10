import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {IVehicle} from '../../../interfaces/vehicle.interface';
import {VehicleService} from '../../../modules/vehicle/vehicle.service';
import {HelperService} from '../../services/helper.service';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

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

  datas: IVehicle[];
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
    this.list();
  }

  list() {
    this.vehicleService.listVehicle().subscribe({
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
