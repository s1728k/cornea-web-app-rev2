import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-analysis',
  templateUrl: './rate-analysis.component.html',
  styleUrls: ['./rate-analysis.component.css']
})
export class RateAnalysisComponent implements OnInit {

  calcs:{}[]=[{},{},{},{},{},{},{},{},{},{}]

  constructor() { }

  ngOnInit() {
  }

}