import {RestApiService} from '../services/rest-api-service.service';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import {RateAnalysis, LineItemTableRow} from '../model/class';
import {NanPipe} from '../shared/pipes/nan.pipe';
import {MdDialog, MdDialogRef} from '@angular/material';
import {RaPopupDialog} from './rapopup.component';

// ------------Models Imported------------------------------
import {ProjectResponseBOQUpload} from '../model/class/project-response';
import {BoqNameId} from '../model/class/name-id.model';
import {MainRateAnalysis} from '../model/class/main-rate-analysis.model'
import {MaterialRateAnalysis} from '../model/class/line-item-material.model'
import {LabourRateAnalysis} from '../model/class/labour-rate-analysis.model'
import {LineItem} from '../model/class/line-item.model'
import {Material} from '../model/class/material.model'

// ------------http imports-------------------------------
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {CRUDService} from '../shared/services/crud.service';
import {MaterialReportUsageList} from '../model/class/MaterialReportUsageList';

@Component({
  selector: 'app-rate-analysis',
  templateUrl: './rate-analysis.component.html',
  styleUrls: ['./rate-analysis.component.css'],
  providers: [CRUDService]
})

export class RateAnalysisComponent implements OnInit, AfterViewInit {

  projects: Observable<ProjectResponseBOQUpload[]>;
  projectSuggestion: Subject<string> = new Subject<string>();

  boqs: Observable<BoqNameId[]>;
  boqSuggestion: Subject<string> = new Subject<string>();

  // lineItems: Observable<LineItem[]>;
  // lineItemSuggestion:Subject<string> = new Subject<string>();

  materials: Observable<Material[]>;
  materialSuggestion: Subject<string> = new Subject<string>();

  materialreportusagelist: MaterialReportUsageList[];

  calcs2: {}[] = [];

  overhead: number = 0;
  profit: number = 20;
  wastage: number = 0;
  cfList: any;
  cf_price: number = 0;
  dl: {} = {}; //boolean array to hide and open the line items.
  projectIdSelected: number = 1;

  lineItems: LineItem[];
  mainRateAnalysis: MainRateAnalysis;
  materialRateAnalysis: MaterialRateAnalysis;
  labourRateAnalysis: LabourRateAnalysis;
  itemRateAnalysis: MainRateAnalysis[] = [];

  // variable for grand total one for item rate analysis and other for overhead.
  grandTotal2V: any;

  constructor(private restApiService: RestApiService, private dialog: MdDialog) {
  }

  ngOnInit() {
    this.projects = this.projectSuggestion
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.restApiService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<ProjectResponseBOQUpload[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<ProjectResponseBOQUpload[]>([]);
      });

    this.boqs = this.boqSuggestion
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.restApiService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<BoqNameId[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<BoqNameId[]>([]);
      });

    // this.lineItems = this.lineItemSuggestion
    //   .debounceTime(300)        // wait 300ms after each keystroke before considering the term
    //   .distinctUntilChanged()   // ignore if next search term is same as previous
    //   .switchMap(term => term   // switch to new observable each time the term changes
    //     // return the http search observable
    //     ? this.restApiService.search(term)
    //     // or the observable of empty heroes if there was no search term
    //     : Observable.of<LineItem[]>([]))
    //   .catch(error => {
    //     // TODO: add real error handling
    //     console.log(error);
    //     return Observable.of<LineItem[]>([]);
    //   });

    this.materials = this.materialSuggestion
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.restApiService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Material[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Material[]>([]);
      });

    // this.lineItems = this.restApiService.comm_obj['lineItems'];
    // for (let i = 0; i < this.lineItems.length; i++) {
    //   this.addMainRateAnalysis();
    //   this.lineItems[i]
    // }
    // console.log(this.lineItems);
    this.getBoqList()
    this.getMaterialReportUsageList();
  }

  ngAfterViewInit() {
    this.searchProjects("1");
    // this.searchLineItems("1");
  }

  getBoqList(): void {
    const url = "http://49.50.76.29/api/boq/1?appends[]=lineItems&hidden[]=created_at&hidden[]=updated_at"
    this.restApiService.getRequest(url)
      .map(response => response.json().data[0])
      .subscribe((value) => {
          console.log(value);
          this.lineItems = value['lineItems'];
          for (let i = 0; i < this.lineItems.length; i++) {
            this.addMainRateAnalysis();
          }
          console.log(this.lineItems);
        },
        (error: any) => {
          console.log(error);
        },
      );
  }

// For getting data of MaterialReportUsage List and showing it on report tab
  getMaterialReportUsageList() {
    const url = 'http://49.50.76.29/api/report/getMaterialUsageForRa?gra_id=1&boq_id=1';
    console.log(url)
    this.restApiService.getRequest(url)
      .map(res => res.json().data)
      .subscribe(
        (value: MaterialReportUsageList[]) => {
          this.materialreportusagelist = value;
          console.log(this.materialreportusagelist);
        },
        (err: any) => {
          console.error(err);
        }
      );

  }

  searchProjects(term: string) {
    const url = "http://49.50.76.29:8090/api/project/1?visible[]=id&visible[]=name$" + term
    this.projectSuggestion.next(url);
  }

  searchBoqs(term: string) {
    const url = "http://49.50.76.29/api/boq/1?appends[]=lineItems&hidden[]=created_at&hidden[]=updated_at&" + term
    this.boqSuggestion.next(url);
  }

  // searchLineItems(term: string){
  //   const url ="http://49.50.76.29/api/boq/1?appends[]=lineItems&hidden[]=created_at&hidden[]=updated_at&"+term
  //   this.materialSuggestion.next(url);
  // }

  searchMaterials(term: string) {
    const url = "http://49.50.76.29/api/material/search?search=" + term + "&filter[]=name&filter[]=srno&filter[]=brand"
    this.materialSuggestion.next(url);
  }

  addMainRateAnalysis({} = {}) {
    this.mainRateAnalysis = new MainRateAnalysis();
    this.itemRateAnalysis.push(this.mainRateAnalysis);
  }

  deleteMainRateAnalysis(i) {
    this.itemRateAnalysis.splice(i, 1);
  }

  addMaterialRateAnalysis(i) {
    if (this.lineItems[i]['title']) {
      this.materialRateAnalysis = new MaterialRateAnalysis();
      this.itemRateAnalysis[i].material_rate_analysis.push(this.materialRateAnalysis)
    } else {
      alert("Please Select The Line Item")
    }
  }

  deleteMaterialRateAnalysis(i, j) {
    this.itemRateAnalysis[i].material_rate_analysis.splice(j, 1);
  }

  updateRow(material, i, j) {
    this.itemRateAnalysis[i].material_rate_analysis[j]['lineItem_id'] = this.lineItems[i]['id'];
    this.itemRateAnalysis[i].material_rate_analysis[j]['uom'] = material['uom'];
    this.itemRateAnalysis[i].material_rate_analysis[j]['rate'] = material['rate'];
    this.itemRateAnalysis[i].material_rate_analysis[j]['srno'] = material['srno'];
    this.itemRateAnalysis[i].material_rate_analysis[j]['material_id'] = material['id'];
    this.cfList = material['coefficiency']['cf_price'];
    //this.itemRateAnalysis[i].material_rate_analysis[j]['CF']=material['coefficiency']['cf_price'];
  }

  postItemRateAnalysis(i) {
    const url = 'http://49.50.76.29/api/ra/new';
    this.itemRateAnalysis[i].lineItem_id = this.lineItems[i]['id'];
    this.itemRateAnalysis[i].boq_id = this.lineItems[i]['boq_id'];
    this.itemRateAnalysis[i].profit_margin = this.profit / 100 * this.itemRateAnalysis[i].grand_total
    this.itemRateAnalysis[i].overhead_margin = this.overhead / 100 * this.itemRateAnalysis[i].grand_total

    for (var j = 0; j < this.itemRateAnalysis[i].labour_rate_analysis.length; j++) {
      this.itemRateAnalysis[i].labour_total = this.itemRateAnalysis[i].labour_total +
        this.itemRateAnalysis[i].labour_rate_analysis[j].amount;
    }

    this.restApiService.postRequest(url, this.itemRateAnalysis[i])
      .map(res => res.json())
      .subscribe(
        (value) => {
          value;
          console.log(value);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  routeToFileUploadScreen() {

  }

  overheadCurrection() {
    for (var i = 0; i < this.itemRateAnalysis.length; i++) {
      this.grandTotal(i);
    }
  }

  profitCurrection() {
    for (var i = 0; i < this.itemRateAnalysis.length; i++) {
      this.grandTotal(i);
    }
  }

  wastageCurrection() {
    for (var i = 0; i < this.itemRateAnalysis.length; i++) {
      this.grandTotal(i);
    }
  }

  grandTotal(i) {
    if (!this.itemRateAnalysis[i].labour_total) {
      this.itemRateAnalysis[i].labour_total = 0
    }

    this.itemRateAnalysis[i].material_total = 0;
    this.itemRateAnalysis[i].profit_margin = 0;
    this.itemRateAnalysis[i].overhead_margin = 0;
    this.itemRateAnalysis[i].grand_total = 0

    this.itemRateAnalysis[i].material_total = 0
    for (let j = this.itemRateAnalysis[i].material_rate_analysis.length - 1; j >= 0; j--) {
      if (this.itemRateAnalysis[i].material_rate_analysis[j]['wastage']) {
        this.itemRateAnalysis[i].material_rate_analysis[j]['amount'] = this.itemRateAnalysis[i].material_rate_analysis[j]['length'] *
          this.itemRateAnalysis[i].material_rate_analysis[j]['breadth'] *
          this.itemRateAnalysis[i].material_rate_analysis[j]['thickness'] *
          this.itemRateAnalysis[i].material_rate_analysis[j]['quantity'] *
          (this.itemRateAnalysis[i].material_rate_analysis[j]['wastage'] / 100 + 1) *
          this.itemRateAnalysis[i].material_rate_analysis[j]['rate'] *
          (this.overhead / 100 + 1) * (this.profit / 100 + 1) +
          +this.cf_price;
        this.itemRateAnalysis[i].material_total = this.itemRateAnalysis[i].material_total + this.itemRateAnalysis[i].material_rate_analysis[j]['amount']
      } else {
        console.log(this.wastage);
        this.itemRateAnalysis[i].material_rate_analysis[j]['amount'] = this.itemRateAnalysis[i].material_rate_analysis[j]['length'] *
          this.itemRateAnalysis[i].material_rate_analysis[j]['breadth'] *
          this.itemRateAnalysis[i].material_rate_analysis[j]['thickness'] *
          this.itemRateAnalysis[i].material_rate_analysis[j]['quantity'] *
          this.itemRateAnalysis[i].material_rate_analysis[j]['rate'] *
          (this.overhead / 100 + 1) * (this.profit / 100 + 1) * (this.wastage / 100 + 1) +
          +this.cf_price;
        this.itemRateAnalysis[i].material_total = this.itemRateAnalysis[i].material_total + this.itemRateAnalysis[i].material_rate_analysis[j]['amount']
      }
      this.itemRateAnalysis[i].grand_total = +this.itemRateAnalysis[i].labour_total + this.itemRateAnalysis[i].material_total
      this.itemRateAnalysis[i].profit_margin = this.profit / 100 * this.itemRateAnalysis[i].grand_total
      this.itemRateAnalysis[i].overhead_margin = this.overhead / 100 * this.itemRateAnalysis[i].grand_total
      console.log(this.itemRateAnalysis[i].labour_total)
      console.log(this.itemRateAnalysis[i].material_total)
      console.log(this.itemRateAnalysis[i].profit_margin)
      console.log(this.itemRateAnalysis[i].overhead_margin)
    }
  }

  // increment2() {
  //   this.calcs2.push([])
  // }
  // deleteTable2(i) {
  //    this.calcs2.splice(i, 1);
  // }
  addRow2(i) {
    this.calcs2.push({});
  }

  deleteRow2(i, j) {
    this.calcs2.splice(j, 1);
  }

// ----clicking the grandTotal button will calculate the grandtotal as there need to have for loop---

  grandTotal2() {
    this.grandTotal2V = 0;
    for (let i = this.calcs2.length - 1; i >= 0; i--) {
      this.grandTotal2V = this.grandTotal2V + this.calcs2[i]['v1'] * this.calcs2[i]['v2'] * this.calcs2[i]['v3'];
    }
  }

  labourCalc: LabourRateAnalysis[] = [];
  lCalc: LabourRateAnalysis = new LabourRateAnalysis;

  openDialogSup(i) {
    const dialogRef = this.dialog.open(RaPopupDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.itemRateAnalysis[i].labour_rate_analysis = result.data;
      this.itemRateAnalysis[i].labour_total = result.labour_total;
      this.itemRateAnalysis[i].grand_total = +this.itemRateAnalysis[i].material_total + +this.itemRateAnalysis[i].labour_total;
      // console.log(result);
    });
  }


}
