import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions} from 'ng-zorro-antd';
import {RegionService} from '../../services/region.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-region-selector',
    templateUrl: './region-selector.component.html',
    styleUrls: ['./region-selector.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RegionSelectorComponent),
            multi: true
        }
    ]
})
export class RegionSelectorComponent implements OnInit, ControlValueAccessor {

    //tslint:disable
    @Input() parentId: number;
    private propagateChange: (_: any) => void;
    isDisabled: boolean;
    private _model;
    nodes: NzTreeNodeOptions[];

    constructor(
        private regionService: RegionService
    ) {
    }


    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
        if (this.propagateChange) {
            this.propagateChange(value);
        }
    }

    ngOnInit() {
        this.nodes = [];
        this.regionService
            .provinces()
            .subscribe({
                next: value => {
                    this.nodes = (value.datas).map(province => {
                        const result = {
                            title: province.name,
                            key: province.id as any,
                            value: province.id as any
                        } as any;
                        if (this.parentId && this.parentId === province.id) {
                            this.loadChildrenToNode(result);
                        }
                        return result;
                    });
                },
                error: err => console.log(err)
            });
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    writeValue(obj: any): void {
        this._model = obj;
    }

    onExpandChange($event: NzFormatEmitEvent) {
        const node = $event.node;
        if ((node.level + 1) === NodeLevel.Province) {
            this.loadChildrenToNode(node);
        } else {
            this.loadChildrenToNode(node, NodeLevel.District);
        }
    }

    loadChildrenToNode(node: NzTreeNode, node_level: number = NodeLevel.Province) {
        if (node && node.getChildren().length === 0 && node.isExpanded) {

            let observable = this.regionService.districts(node.key);

            if (node_level === NodeLevel.District) {
                observable = this.regionService.streets(node.key);
            }

            observable.subscribe({
                next: value => {
                    node.addChildren(value.datas.map(data => {
                        return {
                            key: data.id,
                            value: data.id,
                            title: data.prefix + ' ' + data.name,
                            isLeaf: node_level === NodeLevel.District
                        } as any;
                    }));
                },
                error: err => console.log(err)
            });
        }
    }
}

enum NodeLevel {
    Province = 1,
    District = 2,
}
