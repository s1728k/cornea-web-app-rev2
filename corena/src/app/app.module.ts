import {RouterModule, Routes} from '@angular/router';
// dependency for RestApiService
import {RestApiService} from './services/rest-api-service.service';
// module to support rendering on browser
import {BrowserModule} from '@angular/platform-browser';
// dependency for material module
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// angular dependency to bind the  components
import {NgModule} from '@angular/core';
// module to create form's
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
// dependency to implement http calls to network  angular buit-in
import {HttpModule} from '@angular/http';
import {GanttModule} from './lib';
// for uploading files to server vola softwaare lib angular
import {FileUploadModule} from 'ng2-file-upload';
// including required dependencies from Material Module angular buit-in
import {MaterialModule, MdNativeDateModule, MdButtonModule} from '@angular/material';
// dependency for hammerjs
import 'hammerjs';

// dependency for google charts used  in project for organization tree
import {GoogleChart} from 'angular2-google-chart/directives/angular2-google-chart.directive';
// Common module which holds shared components
import {AppComponent} from './app.component';
// import {FileUploadComponent} from './file-upload/file-upload.component';
// import {ProjectHierarchyComponent} from './project-hierarchy/project-hierarchy.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { PagesModule } from './pages/pages.module';
import { SharedService } from './shared.service';
import { RateAnalysisComponent } from './rate-analysis/rate-analysis.component';
import { GanttchartComponent } from './shared/components/ganttchart/ganttchart.component';
// dependency for local storage
import { LocalStorageModule } from 'angular-2-local-storage';
import { StorageService } from './services/local-storage.service';
import { BoqTableComponent } from './boq-table/boq-table.component';
import { MaterialComponent } from './material/material.component';
import { LabourComponent } from './labour/labour.component';
import { CfComponent } from './cf/cf.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
// import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    // FileUploadComponent,
    // ProjectHierarchyComponent,
    GanttchartComponent,
    GoogleChart,
    LoginComponent,
    RateAnalysisComponent,
    BoqTableComponent,
    MaterialComponent,
    LabourComponent,
    CfComponent,
    DashboardComponent
  ],
  // provide modules throughout
  imports: [
    BrowserModule,
    GanttModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    HttpModule,
    NgbModule.forRoot(),
    MaterialModule,
    MdNativeDateModule,
    MdButtonModule,
    routing,
    PagesModule,
    LocalStorageModule.withConfig({
      prefix: 'cornea-erp',
      // storageType: 'localStorage'
      storageType: 'sessionStorage'
    })
  ],
  providers: [RestApiService, StorageService, SharedService],
  bootstrap: [AppComponent]
})
/**
 * class definition
 */
export class AppModule {
}
