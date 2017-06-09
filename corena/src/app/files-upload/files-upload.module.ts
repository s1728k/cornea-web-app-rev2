import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule, MdNativeDateModule, MdButtonModule} from '@angular/material';
import {FileUploadModule} from 'ng2-file-upload';
import {SharedModule} from '../shared/shared.module';
import {routing} from './files-upload.routing';
import {BoqUploadComponent} from './boq-upload/boq-upload.component';
import {FilesUploadComponent} from './files-upload.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule, MdNativeDateModule, MdButtonModule,FileUploadModule,
    routing
  ],
  declarations: [FilesUploadComponent , BoqUploadComponent]
})
export class FilesUploadModule { }
