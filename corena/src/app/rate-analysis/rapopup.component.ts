import {Component, Inject} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {LabourRateAnalysis} from "../model/class/labour-rate-analysis.model";

@Component({
  selector: 'app-rapopup',
  templateUrl: './rapopup.component.html',
  styleUrls: ['./rapopup.component.css'],
})
export class RaPopupDialog {

  labour_total:number=0;
  labrRateAnalysis: LabourRateAnalysis;
  labourRateAnalysis: LabourRateAnalysis[]= [];
  constructor(public dialogRef: MdDialogRef<RaPopupDialog>) {}

  addRow({}={}){
      this.labrRateAnalysis= new LabourRateAnalysis();
      this.labourRateAnalysis.push(this.labrRateAnalysis)
  }

  deleteRow(i){
      this.labourRateAnalysis.splice(i, 1);
  }

  calc(i){
    this.labour_total=0
      this.labourRateAnalysis[i]['amount'] = this.labourRateAnalysis[i]['breadth'] *
                                             this.labourRateAnalysis[i]['thickness'] *
                                             this.labourRateAnalysis[i]['rate'];
      this.labour_total = this.labour_total + this.labourRateAnalysis[i]['amount'];
  }
}

// import { Component, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

// @Component({
//   selector: 'app-mail',
//   templateUrl: './mail-modal.component.html',
//   styleUrls: ['./mail-modal.component.css']
// })
// export class MailDialog implements OnInit{

//     newMail:{}={};
//     constructor(public dialogRef: MdDialogRef<MailDialog>) {}

//     ngOnInit(){

//     }

// }
