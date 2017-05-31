import {RouterModule, Routes} from '@angular/router';
// module to support rendering on browser
import {BrowserModule} from '@angular/platform-browser';
// dependency for material module
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// angular dependency to bind the  components
import {NgModule} from '@angular/core';
// moduel to create form's
import {FormsModule} from '@angular/forms';
// dependency to implement http calls to network  angular buit-in
import {HttpModule} from '@angular/http';
// for uploading files to server vola software lib angular
import {FileUploadModule} from 'ng2-file-upload';
// including required dependencies from Material Module angular buit-in
import {MaterialModule, MdNativeDateModule, MdButtonModule} from '@angular/material';
import 'hammerjs';
// dependency for google charts used  in project for organization tree
import {GoogleChart} from 'angular2-google-chart/directives/angular2-google-chart.directive';
// Common module which holds shared components

import {AppComponent} from './app.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {ProjectHierarchyComponent} from './project-hierarchy/project-hierarchy.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ProjectHierarchyComponent,
    GoogleChart,
    LoginComponent
  ],
  // provide modules throughout
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    HttpModule,
    MaterialModule,
    MdNativeDateModule,
    MdButtonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
/**
 * class definition
 */
export class AppModule {
}
