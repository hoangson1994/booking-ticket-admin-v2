import {Component, OnInit} from '@angular/core';
import {VoyagesService} from '../voyages.service';
import {HelperService} from '../../../shared/services/helper.service';
import {finalize} from 'rxjs/operators';
import {IVoyage, VoyageStatus} from '../../../interfaces/voyage.interface';

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
        private helper: HelperService
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

    }
}
