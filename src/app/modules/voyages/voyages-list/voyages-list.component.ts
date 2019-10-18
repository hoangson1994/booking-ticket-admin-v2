import {Component, OnInit} from '@angular/core';
import {VoyagesService} from '../voyages.service';
import {HelperService} from '../../../shared/services/helper.service';
import {finalize} from 'rxjs/operators';
import {IVoyage, VoyageStatus} from '../../../interfaces/voyage.interface';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
    selector: 'app-voyages-list',
    templateUrl: './voyages-list.component.html',
    styleUrls: ['./voyages-list.component.less']
})
export class VoyagesListComponent implements OnInit {
    isLoading = false;
    datas: IVoyage[];
    voyageStatus = VoyageStatus;

    constructor(
        private service: VoyagesService,
        private helper: HelperService,
        private notify: NzNotificationService
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.isLoading = true;
        this.service.list()
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: value => {
                    this.datas = value;
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

    doDelete(i: number) {
        const selected = this.datas[i];
        selected.isDeleting = true;
        this.service
            .delete(selected.id)
            .pipe(finalize(() => selected.isDeleting = false))
            .subscribe({
            next: value => {
                this.datas.splice(i, 1);
                this.notify.success('Thành công', 'Xóa tuyến đường thành công');
            },
            error: err => {
                this.helper.handleError(err);
            }
        });
    }
}
