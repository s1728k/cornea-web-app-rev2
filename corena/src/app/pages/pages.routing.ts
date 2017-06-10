import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PagesComponent} from './pages.component';
import {FileUploadComponent} from '../file-upload/file-upload.component';
import {ProjectHierarchyComponent} from '../project-hierarchy/project-hierarchy.component';
import {RateAnalysisComponent} from '../rate-analysis/rate-analysis.component';
import {NextCompComponent} from '../next-comp/next-comp.component';
import {GanttchartComponent} from '../shared/components/ganttchart/ganttchart.component';
import {BoqTableComponent} from '../boq-table/boq-table.component';
import {MaterialComponent} from '../material/material.component';
import {LabourComponent} from '../labour/labour.component';

export const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      {path: '', redirectTo: 'under-construnction', pathMatch: 'full'},
      {path: 'under-construnction', component: NextCompComponent},
      {path: 'boq-tables', component: BoqTableComponent},
      {path: 'project-hierarchy', component: ProjectHierarchyComponent},
      {path: 'rate-analysis', component: RateAnalysisComponent},
      {path: 'ganttchart', component: GanttchartComponent},
      {path: 'files-upload', component: FileUploadComponent},
      {path: 'materials', component: MaterialComponent},
      {path: 'labour', component: LabourComponent},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
