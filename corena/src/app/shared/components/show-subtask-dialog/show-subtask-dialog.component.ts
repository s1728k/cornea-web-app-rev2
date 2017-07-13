import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-show-subtask-dialog',
  templateUrl: './show-subtask-dialog.component.html',
  styleUrls: ['./show-subtask-dialog.component.css']
})
export class ShowSubtaskDialogComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<ShowSubtaskDialogComponent>) {

  }

  ngOnInit() {
  }

}
