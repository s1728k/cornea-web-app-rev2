import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProjectHierarchyComponent } from './project-hierarchy/project-hierarchy.component';
import { SharedService } from './shared.service'

const appRoutes: Routes = [
  //{ path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'project-hierarchy', component: ProjectHierarchyComponent },
  { path: 'boq-upload', component: FileUploadComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot( appRoutes )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SharedService,
  ]
})

export class AppRoutingModule {}
