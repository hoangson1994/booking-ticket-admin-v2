import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../vehicle.service';
import {HelperService} from '../../../shared/services/helper.service';
import {IVehicle, VehicleStatus} from '../../../interfaces/vehicle.interface';
import {finalize} from 'rxjs/operators';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.less']
})
export class VehiclesListComponent implements OnInit {
  isLoding: boolean;
  datas: IVehicle[] = null;
  vehicleStatus = VehicleStatus;

  constructor(
    private vehicleService: VehicleService,
    private helper: HelperService,
    private notify: NzNotificationService
  ) {
  }

  ngOnInit() {
    this.isLoding = true;
    this.listVehicle();
  }

  listVehicle() {
    this.vehicleService.listVehicle().pipe(finalize(() => this.isLoding = false)).subscribe({
      next: value => {
        this.datas = value;
      },
      error: err => {
        this.helper.handleError(err);
      }
    });
  }

  deleteVehicle(id: number) {
    const selected = this.datas[id];
    selected.isDeleting = true;
    this.vehicleService.deleteVehicle(selected.id).subscribe({
      next: value => {
        this.datas.splice(id, 1);
        this.notify.success('Thành công', 'Xóa xe thành công');
      },
      error: err => {
        this.helper.handleError(err);
      }
    });
  }
}
