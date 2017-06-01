import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule, MdNativeDateModule, MdButtonModule} from '@angular/material';
import {DndModule} from 'ng2-dnd';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule, MdNativeDateModule, MdButtonModule,
    DndModule.forRoot()
  ],
  exports: [DndModule,SideNavComponent, TopHeaderComponent],
  declarations: [SideNavComponent, TopHeaderComponent]
})
export class SharedModule { }
