import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule, MdNativeDateModule, MdButtonModule} from '@angular/material';
import {DndModule} from 'ng2-dnd';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { IconsComponent } from './components/icons/icons.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule, MdNativeDateModule, MdButtonModule,
    DndModule.forRoot()
  ],
  declarations: [SideNavComponent, TopHeaderComponent, IconsComponent],
  exports: [DndModule,SideNavComponent, TopHeaderComponent, IconsComponent],
})
export class SharedModule { }
