import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {FileUploadModule} from 'ng2-file-upload';
import {MaterialModule, MdNativeDateModule} from '@angular/material';
import 'hammerjs';

import {AppComponent} from './app.component';
import {FileUploadComponent} from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    // import to add dependency for file upload
    FileUploadModule,
    HttpModule,
    MaterialModule,
    MdNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
