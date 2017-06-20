import { Injectable } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {AlertdialogComponent} from '../../components/alertdialog/alertdialog.component';

@Injectable()
export class DialogService {


  constructor(private dialog: MdDialog) {
  }

  public confirm(title: string, message: string): Observable<boolean> {

    let dialogRef: MdDialogRef<AlertdialogComponent>;

    dialogRef = this.dialog.open(AlertdialogComponent, {disableClose: true});
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }


}
