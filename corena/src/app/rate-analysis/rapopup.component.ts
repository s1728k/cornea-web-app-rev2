import {Component, Inject} from '@angular/core';
import {MdDialogRef} from '@angular/material';


@Component({
  selector: 'app-rapopup',
  templateUrl: './rapopup.component.html',
  styleUrls: ['./rapopup.component.css'],
})
export class RaPopupDialog {
  cfObj: {}[]= [];
  constructor(public dialogRef: MdDialogRef<RaPopupDialog>) {}

  addRow({}={}){
      this.cfObj.push({})
  }
  deleteRow(i){
      this.cfObj.splice(i, 1);
  }
  calc(i){
      this.cfObj[i]['amount'] = this.cfObj[i]['length'] *
        this.cfObj[i]['breadth'] *
        this.cfObj[i]['thickness'] *
        this.cfObj[i]['running_metre'] *
        this.cfObj[i]['rate'];
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
