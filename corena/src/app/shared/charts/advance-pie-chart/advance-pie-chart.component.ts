import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advance-pie-chart',
  template: `
    <ngx-charts-advanced-pie-chart
      [view]="view"
      [scheme]="colorScheme"
      [results]="single"
      [gradient]="gradient"
      (select)="onSelect($event)">
    </ngx-charts-advanced-pie-chart>
  `
  // templateUrl: './advance-pie-chart.component.html',
  // styleUrls: ['./advance-pie-chart.component.css']
})
export class AdvancePieChartComponent implements OnInit {


  ngOnInit() {
  }

  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];

  multi: any[];

  view: any[] = [700, 400];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    // Object.assign(this, {single, multi})
  }

  onSelect(event) {
    console.log(event);
  }
}
