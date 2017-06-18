import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MaterialModule, MdNativeDateModule, MdButtonModule} from '@angular/material';
import {DndModule} from 'ng2-dnd';
import { IconsComponent } from './components/icons/icons.component';
import {NanPipe} from "./pipes/nan.pipe";
import {PaginationComponent} from "./components/pagination/pagination.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule, MdNativeDateModule, MdButtonModule, FormsModule,
    DndModule.forRoot()
  ],
  declarations: [IconsComponent, PaginationComponent, NanPipe],
  exports: [DndModule, IconsComponent, PaginationComponent, NanPipe],
})
export class SharedModule { }
