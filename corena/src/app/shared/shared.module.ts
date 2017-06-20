import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule, MdNativeDateModule, MdButtonModule} from '@angular/material';
import {DndModule} from 'ng2-dnd';
import {IconsComponent} from './components/icons/icons.component';
import {NanPipe} from './pipes/nan.pipe';
import {PaginationComponent} from './components/pagination/pagination.component';
import {AdvancePieChartComponent} from './charts/advance-pie-chart/advance-pie-chart.component';
import {ChartsComponent} from './charts/charts.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {PieChartComponent} from './charts/pie-chart/pie-chart.component';
import {AlertdialogComponent} from './components/alertdialog/alertdialog.component';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    MaterialModule, MdNativeDateModule, MdButtonModule, FormsModule,
    DndModule.forRoot()
  ],
  declarations: [IconsComponent, PaginationComponent, AlertdialogComponent, NanPipe, AdvancePieChartComponent, PieChartComponent, ChartsComponent],
  exports: [DndModule, IconsComponent, PaginationComponent, NanPipe],
  entryComponents: [AlertdialogComponent]
})
export class SharedModule {
}
