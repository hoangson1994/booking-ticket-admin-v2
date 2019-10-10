import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../services/helper.service';

@Component({
  selector: 'app-tab-content-order',
  templateUrl: './tab-content-order.component.html',
  styleUrls: ['./tab-content-order.component.less']
})
export class TabContentOrderComponent implements OnInit {

  @Input()
  customTitle: number;
  constructor(
  ) {}

  ngOnInit() {
    console.log(this.customTitle);
  }




}
