import {Component, Inject} from '@angular/core';
import {MdDialogRef} from '@angular/material';


@Component({
  selector: 'app-rapopup',
  templateUrl: './rapopup.component.html',
  styleUrls: ['./rapopup.component.css'],
})
export class RaPopupDialog {
  cfObj: {}= {};
  constructor(public dialogRef: MdDialogRef<RaPopupDialog>) {}
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
