import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages.component';
import { FileUploadComponent } from '../file-upload/file-upload.component'
import { ProjectHierarchyComponent } from '../project-hierarchy/project-hierarchy.component'
import { RateAnalysisComponent } from '../rate-analysis/rate-analysis.component'
import { NextCompComponent } from '../next-comp/next-comp.component'

export const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'boq-upload', pathMatch: 'full' },
      { path: 'under-construnction', component: NextCompComponent },
      { path: 'boq-upload', component: FileUploadComponent },
      { path: 'project-hierarchy', component: ProjectHierarchyComponent },
      { path: 'rate-analysis', component: RateAnalysisComponent },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);