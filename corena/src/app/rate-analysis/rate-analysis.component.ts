import { Component, OnInit } from '@angular/core';
import { RateAnalysis } from '../model/rate.model'
import { NanPipe } from '../nan.pipe'

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
  grandTotalV:number=0;
  grandTotal(j){
    this.grandTotalV=0;
    for (var i = this.calcs1[j].length - 1; i >= 0; i--) {
      this.grandTotalV=this.grandTotalV+(+this.calcs1[j][i]['v1'])*(+this.calcs1[j][i]['v2'])* (+this.calcs1[j][i]['v3'])*0.0012*8000* (+this.calcs1[j][i]['v4'])
    }
  }
  dropList1:{}[]=[{"key":"value1"},{"key":"value2"},{"key":"value3"},{"key":"value4"}]


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

  grandTotal2V:number=0;
  grandTotal2(){
    this.grandTotal2V=0;
    for (var i = this.calcs2.length - 1; i >= 0; i--) {
      this.grandTotal2V=this.grandTotal2V+(+this.calcs2[i]['v1'])*(+this.calcs2[i]['v2'])* (+this.calcs2[i]['v3'])*0.0012*8000* (+this.calcs2[i]['v4'])
    }
  }
  dropList2:{}[]=[{"key":"value1"},{"key":"value2"},{"key":"value3"},{"key":"value4"}]


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