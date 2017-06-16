import {Component, OnInit} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA, MdDialogConfig} from '@angular/material';
import {DialogService} from '../shared/services/dialog.service';
import * as Constants from '../shared/constants.globals';

@Component({
  selector: 'app-next-comp',
  templateUrl: './next-comp.component.html',
  styleUrls: ['./next-comp.component.css'],
  providers: [DialogService]
})
export class NextCompComponent implements OnInit {

  public result: any;
  config: MdDialogConfig = {
    disableClose: false,
  }


  constructor(private dialogsService: DialogService) {
  }

  public openDialog() {
    this.dialogsService
      .confirm(Constants.NOT_FOUND_TITLE, Constants.NOT_FOUND_DESCRIPTION)
      .subscribe(res => this.result = res);
  }

  ngOnInit() {
  }

}
