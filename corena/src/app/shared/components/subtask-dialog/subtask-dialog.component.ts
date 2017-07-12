import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-subtask-dialog',
  templateUrl: './subtask-dialog.component.html',
  styleUrls: ['./subtask-dialog.component.css']
})
export class SubtaskDialogComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<SubtaskDialogComponent>) {

  }

  ngOnInit() {
  }

}
