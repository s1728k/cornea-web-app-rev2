import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {FileUploadModule} from 'ng2-file-upload';
import {MaterialModule, MdNativeDateModule, MdButtonModule} from '@angular/material';
import 'hammerjs';

import {AppComponent} from './app.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import { ProjectHierarchyComponent } from './project-hierarchy/project-hierarchy.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ProjectHierarchyComponent
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
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
