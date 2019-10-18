import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-custom-bar-chart',
  templateUrl: './custom-bar-chart.component.html',
  styleUrls: ['./custom-bar-chart.component.less']
})
export class CustomBarChartComponent implements OnInit {

  @Input() title: string;
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() datas: any[];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  colorScheme = {
    domain: ['#1890ff']
  };
  constructor() { }

  ngOnInit() {
  }

  getTotal() {
    let result = 0;
    if (this.datas) {
      this.datas.forEach(d => {
        result += d.value;
      });
    }
    return result.toLocaleString('us');
  }

}
