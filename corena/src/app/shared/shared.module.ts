import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MaterialModule, MdNativeDateModule, MdButtonModule} from '@angular/material';
import {DndModule} from 'ng2-dnd';
import { NgxChartsModule  } from '@swimlane/ngx-charts';

import { IconsComponent } from './components/icons/icons.component';
import {NanPipe} from "./pipes/nan.pipe";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {ChartsComponent} from "./components/charts/charts.component";
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { AdvancePieChartComponent } from './components/charts/advance-pie-chart/advance-pie-chart.component';
import { SubtaskDialogComponent } from './components/subtask-dialog/subtask-dialog.component';
import { CreateParentTaskComponent } from './components/create-parent-task/create-parent-task.component';
import { GanttchartDialogComponent } from './components/ganttchart-dialog/ganttchart-dialog.component';

@NgModule({
  imports: [
    CommonModule, NgxChartsModule,
    MaterialModule, MdNativeDateModule, MdButtonModule, FormsModule,
    DndModule.forRoot()
  ],
  declarations: [IconsComponent, PaginationComponent, NanPipe, ChartsComponent, PieChartComponent, AdvancePieChartComponent, SubtaskDialogComponent, CreateParentTaskComponent, GanttchartDialogComponent],
  exports: [DndModule, IconsComponent, PaginationComponent, NanPipe, ChartsComponent, PieChartComponent, AdvancePieChartComponent],
  entryComponents: [SubtaskDialogComponent]
})
export class SharedModule { }
