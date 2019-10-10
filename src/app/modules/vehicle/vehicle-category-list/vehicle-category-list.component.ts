import { Component, OnInit } from '@angular/core';
import {IVehicleCategory, VehicleCategoryStatus} from '../../../interfaces/vehicle-category.interface';
import {HelperService} from '../../../shared/services/helper.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {ERouters} from '../../../resources/static.resource';
import {VehicleService} from '../vehicle.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-vehicle-category-list',
  templateUrl: './vehicle-category-list.component.html',
  styleUrls: ['./vehicle-category-list.component.less']
})
export class VehicleCategoryListComponent implements OnInit {

  isLoading: boolean;
  datas: IVehicleCategory[];
  vehicleCategoryStatus = VehicleCategoryStatus;

  constructor(
    private service: VehicleService,
    private helper: HelperService,
    private notify: NzNotificationService
  ) { }

  ngOnInit() {
    this.datas = [];
    this.refresh();
  }

  refresh() {
    this.isLoading = true;
    this.service.listVehicleCategories()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: value => {
          this.datas = value;
        },
        error: err => this.helper.handleError(err)
      });
  }

  delete(i: number) {
    const selected = this.datas[i];
    selected.isDeleting = true;
    this.service.deleteVehicleCategory(selected.id)
      .pipe(finalize(() => selected.isDeleting = false))
      .subscribe({
        next: value => {
          this.datas.splice(i, 1);
          this.notify.success('Thành công', 'Xóa nhóm xe thành công');
        },
        error: err => this.helper.handleError(err)
      });
  }

}
