import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {BoqUploadComponent} from './';
import {FilesUploadComponent} from './files-upload.component';


export const routes: Routes = [
  {
    path: 'boq-upload',
    component: BoqUploadComponent,
    children: [
      // {path: '', redirectTo: 'boq-upload', pathMatch: 'full'},
      // {path: 'boq-upload', component: BoqUploadComponent},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
