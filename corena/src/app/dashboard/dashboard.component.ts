import {
  Component, Input, Output, OnInit, ViewEncapsulation, EventEmitter, ChangeDetectionStrategy,
  ContentChild, TemplateRef
} from '@angular/core';
import {calculateViewDimensions} from './new-dimension.helper';
import {ColorHelper} from './color.helper';
import {BaseChartComponent} from './base-chart.component';
import {single, multi} from './data';
import {Router} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';
import {CRUDService} from '../shared/services/crud.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [CRUDService]
})
export class DashboardComponent implements OnInit {

  setData(demo): any {
    let arr2 = [];

    for (let key in demo) {
      let arr = {'name': '', 'value': 0};
      arr.name = key;
      arr.value = Number(demo[key]);

      arr2.push(arr);
    }
    console.log(arr2);
    return arr2;
  }

  multi: any[] = [];
  title = "Status";
  view: any[] = [700, 400];

  // options
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor(private router: Router,
              private crudService: CRUDService,
              private localStorageService: LocalStorageService) {
  }


  ngOnInit() {
    this.getPoPageCount()
    this.getIndPageCount()
  }

  //----------------for Purchase Order-------------------------------------------------------------------
  statusListPo: string[] = ['srno', 'material name', 'usage count', 'rate','amount']
  demoPo: {} = {};
  singlePo: any[] = this.setData(this.demoPo);

  statusPo: string = "draft";
  poList: {}[] = []
  pageCountPo: number = 1;
  flagPo: boolean = false;
  attrDispPo: string[] = ['Sr.No.', 'Indent', 'Project', 'Approved', 'Status', 'Required By', 'PO Type']
  attrNamesPo: string[] = ['sl_no', 'indent_id', 'project_id', 'approved', 'status', 'required_by', 'po_type']

  getPoList(p: any): void {
    this.crudService.url = "http://192.168.0.205:8080/api/po/all?conditions[status]=" + this.statusPo + "&page=" + String(p) + "&perPage=10"
    this.crudService
      .getObjs()
      .then(poList => this.poList = poList);
    this.poList = this.formatDates(this.poList)
  }

  getPoPageCount(): void {
    this.crudService.url = "http://192.168.0.205:8080/api/po/getDashBoardReports"
    this.crudService
      .getObjs()
      .then(demoPo => {
        this.demoPo = demoPo[0];
        this.singlePo = this.setData(this.demoPo)
      });
  }

  updatePoList(status) {
    this.statusPo = status['name']
    this.getPoList(0)
    this.flagPo = true
  }

//----------------for Indents----------------------------------------------------------------------
  statusListInd: string[] = ['srno', 'material name', 'usage count', 'rate', 'amount']
  demoInd: {} = {"srno": 2, "material name": 12, "usage count": 20, "rate": 20, "amount": 0};
  singleInd: any[] = this.setData(this.demoInd);

  statusInd: string = "draft";
  indList: {}[] = []
  pageCountInd: number;
  flagInd: boolean = false;
  attrDispInd: string[] = ['ID', 'Site Id', 'Project Id', 'Created At', 'Updated At', 'Indented By', 'Status', 'Redirect']
  attrNamesInd: string[] = ['id', 'site_id', 'project_id', 'created_at', 'updated_at', 'indented_by', 'status']

  getIndList(p: any): void {
    this.crudService.url = "http://192.168.0.205:9000/api/indent/all?conditions[status]=" + this.statusInd + "&page=" + String(p) + "&perPage=10"
    this.crudService
      .getObjs()
      .then(indList => this.indList = indList);
    console.log(this.indList)

    this.formatDates(this.indList)
    console.log(this.indList)
  }

  getIndPageCount(): void {
    // this.crudService.url = "http://49.50.76.29/api/report/getMaterialUsageForRa?gra_id=1&boq_id=1";
    this.crudService.url = "http://192.168.0.205:9000/api/indent/getDashBoardReports";
    this.crudService
      .getObjs()
      .then(demoInd => {
        this.demoInd = demoInd[0];
        this.singleInd = this.setData(this.demoInd);
      });
  }

  updateIndList(status) {
    this.statusInd = status['name']
    this.getIndList(0)
    this.flagInd = true;
  }

//--------------------------------------------------------------------------------------------------------------
  redirectToTrackSheet(obj, path) {
    this.crudService.poFrom['type'] = "fromDash"
    this.crudService.poFrom['param'] = obj['id']
    this.crudService.poFrom['role'] = this.localStorageService.get('isSmp')
    this.router.navigate(['/' + path]);
  }

//-----------------------------------------Date Part Not Working------------------------------------------------------------
  formatDates(listPo): {}[] {

    for (let i = 0; i < listPo.length; i++) {
      console.log(listPo[i]['created_at'])
      if (listPo[i]['created_at'] instanceof Date) {
        listPo[i]['created_at'] = listPo[i]['created_at'].toLocaleDateString();
        listPo[i]['updated_at'] = listPo[i]['updated_at'].toLocaleDateString();
        console.log(listPo[i]['created_at'])
      }
    }
    return listPo
  }

  refreshPo(arr) {
    this.poList = this.formatDates(arr)
  }

  refreshInd(arr) {
    this.indList = this.formatDates(arr)
  }

}
