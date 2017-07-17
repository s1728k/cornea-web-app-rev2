import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-show-complete-task-dialog',
  templateUrl: './show-complete-task-dialog.component.html',
  styleUrls: ['./show-complete-task-dialog.component.css']
})
export class ShowCompleteTaskDialogComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 30;
  bufferValue = 40;

  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<ShowCompleteTaskDialogComponent>) { }

  ngOnInit() {
  }

}
