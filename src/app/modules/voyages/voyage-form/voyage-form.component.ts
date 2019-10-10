import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {VoyagesService} from '../voyages.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {HelperService} from '../../../shared/services/helper.service';
import {Router} from '@angular/router';
import {ERouters} from '../../../resources/static.resource';

@Component({
    selector: 'app-voyage-form',
    templateUrl: './voyage-form.component.html',
    styleUrls: ['./voyage-form.component.less']
})
export class VoyageFormComponent implements OnInit {

    voyageForm: FormGroup;
    isSaving = false;

    constructor(
        private fb: FormBuilder,
        public service: VoyagesService,
        public helper: HelperService,
        private notify: NzNotificationService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.voyageForm = this.fb.group(this.service.generatedFormControl());
    }

    addRecord() {
        const formArr = this.voyageForm.get('voyagePartRequests') as FormArray;
        console.log(formArr);
        formArr.push(this.service.addVoyagePartFormGroup());
        // console.log(formArr);
    }

    removeItem(i: number) {
        const voyagePartForm = this.voyageForm.get('voyagePartRequests') as FormArray;
        if (voyagePartForm.length < 2) {
            return;
        }
        voyagePartForm.removeAt(i);
    }

    submitForm() {
        this.helper.setDirtyAForm(this.voyageForm);
        if (this.voyageForm.invalid) {
            return;
        }
        const voyageParts = this.voyageForm.get('voyagePartRequests') as FormArray;
        for (const part of voyageParts.controls) {
            //tslint:disable
            const _part = part as FormGroup;
            this.helper.setDirtyAForm(_part);
            if (_part.invalid) {
                return;
            }
        }

        this.service
            .create(this.voyageForm.value)
            .subscribe({
                next: value => {
                    this.notify.success('Thành công', 'Thêm tuyến đường thành công');
                    this.router.navigate(['/', ERouters.voyages, ERouters.list]);
                },
                error: err => {
                    this.helper.handleError(err);
                }
            })
    }
}
