import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PagesComponent} from './pages.component';
import {FileUploadComponent} from '../file-upload/file-upload.component';
import {ProjectHierarchyComponent} from '../project-hierarchy/project-hierarchy.component';
import {RateAnalysisComponent} from '../rate-analysis/rate-analysis.component';
import {RateAnalysisDisplayComponent} from '../rate-analysis-display/rate-analysis-display.component';
import {NextCompComponent} from '../next-comp/next-comp.component';
import {GanttchartComponent} from '../shared/components/ganttchart/ganttchart.component';
import {BoqTableComponent} from '../boq-table/boq-table.component';
import {MaterialComponent} from '../material/material.component';
import {LabourComponent} from '../labour/labour.component';
import {CfComponent} from '../cf/cf.component';
import {ProjectComponent} from '../project/project.component';
import {TaskmanagementComponent} from "../taskmanagement/taskmanagement.component";

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
      {path: 'rate-analysis-display', component: RateAnalysisDisplayComponent},
      {path: 'ganttchart', component: GanttchartComponent},
      {path: 'files-upload', component: FileUploadComponent},
      {path: 'materials', component: MaterialComponent},
      {path: 'labour', component: LabourComponent},
      {path: 'cf-factor', component: CfComponent},
      {path: 'projects', component: ProjectComponent},
      {path: 'task-management', component: TaskmanagementComponent},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
