import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule, MdNativeDateModule, MdButtonModule} from '@angular/material';
import {DndModule} from 'ng2-dnd';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { IconsComponent } from './components/icons/icons.component';
import {NanPipe} from './pipes/nan.pipe';
import {PaginationComponent} from './components/pagination/pagination.component';
import { AlertdialogComponent } from './components/alertdialog/alertdialog.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule, MdNativeDateModule, MdButtonModule,
    DndModule.forRoot(),

  ],
  declarations: [SideNavComponent, TopHeaderComponent, IconsComponent, PaginationComponent, NanPipe, AlertdialogComponent, LoaderComponent],
  exports: [DndModule, SideNavComponent, TopHeaderComponent, IconsComponent, PaginationComponent, NanPipe],
  entryComponents: [AlertdialogComponent]
})
export class SharedModule { }
