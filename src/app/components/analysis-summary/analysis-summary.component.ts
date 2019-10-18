import {Component, Input, OnInit} from '@angular/core';
import {ISummaryInput} from './summary-input';

@Component({
  selector: 'app-analysis-summary',
  templateUrl: './analysis-summary.component.html',
  styleUrls: ['./analysis-summary.component.less']
})
export class AnalysisSummaryComponent implements OnInit {

  @Input() inputData: ISummaryInput;
  @Input() icon: string;
  constructor() { }

  ngOnInit() {
  }

}
