import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../vehicle.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {HelperService} from '../../../shared/services/helper.service';
import {finalize} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {IVehicleCategory} from '../../../interfaces/vehicle-category.interface';

@Component({
  selector: 'app-vehicle-category-form',
  templateUrl: './vehicle-category-form.component.html',
  styleUrls: ['./vehicle-category-form.component.less']
})
export class VehicleCategoryFormComponent implements OnInit {
  form: FormGroup;
  isPost = false;
  isSubmit = true;
  vehicleCategory: IVehicleCategory;
  id: Params;

  constructor(
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    private notify: NzNotificationService,
    private helper: HelperService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group(vehicleService.formControlVehicleCategory);
    this.activatedRoute.params.subscribe({
      next: value => {
        this.id = value.id;
      },
      error: err => {
        this.helper.handleError(err);
      }
    });
    if (this.id !== undefined) {
      this.isSubmit = false;
      this.selectVehicleCategory(this.id);
    }
  }

  ngOnInit() {
    // activatedroute
  }

  selectVehicleCategory(id) {
    this.vehicleService
      .singleVehicleCategory(id)
      .subscribe({
        next: value => {
          this.form.patchValue(
            {
              name: value.name,
              seatQuantity: value.seatQuantity,
              price: value.price
            });
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
    this.vehicleService.createVehicleCategory(this.form.value)
      .pipe(finalize(() => this.isPost = false))
      .subscribe(
        {
          next: val => {
            this.notify.success('Thành công', 'Tạo nhóm xe thành công');
            this.router.navigate(['/vehicles/vehicle-category-list']);
          },
          error: err => {
            this.helper.handleError(err);
          }
        }
      );
  }

  onEdit() {
    if (this.form.invalid) {
      return;
    }
    this.isPost = true;
    this.vehicleService.editVehicleCategory(this.form.value, this.id)
      .pipe(
        finalize(() => {
          this.isPost = false;
        })
      )
      .subscribe({
        next: value => {
          this.notify.success('Thành công', 'Sửa nhóm xe thành công');
          this.router.navigate(['/vehicles/vehicle-category-list']);
        }, error: err => {
          this.helper.handleError(err);
        }
      });
  }
}
