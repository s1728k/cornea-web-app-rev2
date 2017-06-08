import { NgModule }      from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule }  from '@angular/common';
import {MaterialModule, MdNativeDateModule, MdButtonModule} from '@angular/material';
import {FileUploadModule} from 'ng2-file-upload';
import {DndModule} from 'ng2-dnd';

import { routing }       from './pages.routing';

import { FileUploadComponent } from '../file-upload/file-upload.component'
import { ProjectHierarchyComponent } from '../project-hierarchy/project-hierarchy.component'
import { PopupDialog } from '../project-hierarchy/popup.component'


import { PagesComponent } from './pages.component';
import {IconsComponent} from '../icons/icons.component';

@NgModule({
  imports: [CommonModule, MaterialModule, MdNativeDateModule, MdButtonModule, NgbModule,
  FileUploadModule, DndModule.forRoot(), routing],
  declarations: [PagesComponent, FileUploadComponent, ProjectHierarchyComponent, PopupDialog, IconsComponent],
  entryComponents: [PopupDialog]
})
export class PagesModule {
}
