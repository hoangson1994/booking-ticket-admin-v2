import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {IUser} from '../../../interfaces/user.interface';
import {UserService} from '../../../modules/user/user.service';
import {HelperService} from '../../services/helper.service';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSelectorComponent),
      multi: true
    }
  ]
})
export class UserSelectorComponent implements OnInit {
  @Input()
  mode: string;

  data: IUser[];
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
    private userService: UserService,
    private helper: HelperService
  ) {
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.userService.listUser().subscribe({
      next: value => this.data = value,
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
