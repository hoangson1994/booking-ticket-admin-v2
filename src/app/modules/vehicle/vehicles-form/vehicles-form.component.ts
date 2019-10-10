import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VehicleService} from '../vehicle.service';
import {finalize} from 'rxjs/operators';
import {HelperService} from '../../../shared/services/helper.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-vehicles-form',
  templateUrl: './vehicles-form.component.html',
  styleUrls: ['./vehicles-form.component.less']
})
export class VehiclesFormComponent implements OnInit {
  form: FormGroup;
  isPost = false;
  isSubmit = true;
  id: Params;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private helper: HelperService,
    private notify: NzNotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group(vehicleService.formControlVehicle);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: value => {
        this.id = value.id;
        if (this.id !== undefined) {
          this.isSubmit = false;
          this.selectVehicle(this.id);
        }
      },
      error: err => {
        this.helper.handleError(err);
      }
    });

  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.isPost = true;
    this.vehicleService.createVehicle(this.form.value)
      .pipe(
        finalize(() => this.isPost = false)
      )
      .subscribe({
        next: value => {
          this.notify.success('Thành công', 'Thêm xe thành công');
        },
        error: err => {
          this.helper.handleError(err);
        }
      });
  }

  selectVehicle(id) {
    this.vehicleService.singleVehicle(id)
      .subscribe({
        next: value => {
          this.helper.setValueToForm(this.form, value);
        },
        error: err => {
          this.helper.handleError(err);
        }
      });
  }

  onEdit() {
    this.helper.setDirtyAForm(this.form);
    if (this.form.invalid) {
      return;
    }
    this.isPost = true;
    this.vehicleService.editVehicle(this.form.value, this.id)
      .pipe(finalize(() => this.isPost = false))
      .subscribe({
        next: value => {
          this.notify.success('Thành công', 'Sửa xe thành công');
          this.router.navigate(['/vehicles/vehicle-list']);
        },
        error: err => {
          this.helper.handleError(err);
        }
      });
  }
}
