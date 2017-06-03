import { Component, OnInit } from '@angular/core';
import { RateAnalysis } from '../model/rate.model'

@Component({
  selector: 'app-rate-analysis',
  templateUrl: './rate-analysis.component.html',
  styleUrls: ['./rate-analysis.component.css']
})
export class RateAnalysisComponent implements OnInit {

  calcs1:RateAnalysis[][]=[];
  calcs2:RateAnalysis[]=[];
  //calcs3:RateAnalysis[][]=[];

  constructor() { }

  ngOnInit() {

  }

  // overhead:number;
  // tff(val){
  //   this.overhead = this.overhead
  // }
  //list:any[]=[]
  increment1(){
    this.calcs1.push([])
  }
  deleteTable1(i){
     this.calcs1.splice(i, 1);
  }
  addRow1(i){
    this.calcs1[i].push({})
  }
  deleteRow1(i,j){
    this.calcs1[i].splice(j, 1);
  }


  // increment2(){
  //   this.calcs2.push([])
  // }
  // deleteTable2(i){
  //    this.calcs2.splice(i, 1);
  // }
  addRow2(i){
    this.calcs2.push({})
  }
  deleteRow2(i,j){
    this.calcs2.splice(j, 1);
  }


  // increment3(){
  //   this.calcs3.push([])
  // }
  // deleteTable3(i){
  //    this.calcs3.splice(i, 1);
  // }
  // addRow3(i){
  //   this.calcs3[i].push({})
  // }
  // deleteRow3(i,j){
  //   this.calcs3[i].splice(j, 1);
  // }
}