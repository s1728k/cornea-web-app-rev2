import {Component, Inject} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-popup',
  templateUrl:'./popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupDialog {
  constructor(public dialogRef: MdDialogRef<PopupDialog>,
              @Inject(MD_DIALOG_DATA) public data:any ) {}
}
