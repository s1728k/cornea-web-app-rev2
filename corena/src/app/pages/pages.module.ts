import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import {MaterialModule, MdNativeDateModule, MdButtonModule} from '@angular/material';
import {FileUploadModule} from 'ng2-file-upload';
import {DndModule} from 'ng2-dnd';

import { routing }       from './pages.routing';

import { FileUploadComponent } from '../file-upload/file-upload.component'
import { ProjectHierarchyComponent } from '../project-hierarchy/project-hierarchy.component'


import { PagesComponent } from './pages.component';

@NgModule({
  imports: [CommonModule, MaterialModule, MdNativeDateModule, MdButtonModule, FileUploadModule, DndModule.forRoot(), routing],
  declarations: [PagesComponent, FileUploadComponent, ProjectHierarchyComponent]
})
export class PagesModule {
}