import {Injectable} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {AlertdialogComponent} from '../../components/alertdialog/alertdialog.component';


@Injectable()
export class DialogService {

  dialogRef: MdDialogRef<AlertdialogComponent>;
  title: string;
  message: string;

  constructor(private dialog: MdDialog) {
  }

  public confirm(title: string, message: string): Observable<boolean> {
    this.dialogRef = this.dialog.open(AlertdialogComponent, {disableClose: true});
    this.dialogRef.componentInstance.title = title;
    this.dialogRef.componentInstance.message = message;

    return this.dialogRef.afterClosed();
  }

// This method is used to open AlertService dialog with it alert title and description.
  errorNotification(errorCode: number): Observable<boolean> {
    switch (errorCode) {
      case 404:
        this.dialogRef = this.dialog.open(AlertdialogComponent, {disableClose: true});
        this.dialogRef.componentInstance.title = '404 NOT FOUND';
        this.dialogRef.componentInstance.message = 'The requested page could not be found but may be available again in the future';
        break;

      case 400:
        this.dialogRef = this.dialog.open(AlertdialogComponent, {disableClose: true});
        this.dialogRef.componentInstance.title = '400 BAD REQUEST';
        this.dialogRef.componentInstance.message = 'The request cannot be fulfilled due to bad syntax';
        break;

      case 403:
      this.dialogRef = this.dialog.open(AlertdialogComponent, {disableClose: true});
      this.dialogRef.componentInstance.title = '403 Forbidden';
      this.dialogRef.componentInstance.message = 'The request was a legal request, but the server is refusing to respond to it';
      break;

      case 406:
        this.dialogRef = this.dialog.open(AlertdialogComponent, {disableClose: true});
        this.dialogRef.componentInstance.title = '406 Not Acceptable';
        this.dialogRef.componentInstance.message = 'The server can only generate a response that is not accepted by the client';
        break;

      case 401:
        this.dialogRef = this.dialog.open(AlertdialogComponent, {disableClose: true});
        this.dialogRef.componentInstance.title = '401 UNAUTHORIZED';
        this.dialogRef.componentInstance.message = 'The request was a legal request, but the server is refusing to respond to it. For use when authentication is possible but has failed or not yet been provided';
        break;

    }
    return this.dialogRef.afterClosed();
  }
}
