import {RestApiService} from '../services/rest-api-service.service';
import {Component, OnInit} from '@angular/core';
import {RateAnalysis, LineItemTableRow} from '../model/class';
import {LineItem} from '../model/class/line-item.model';
import {NanPipe} from '../shared/pipes/nan.pipe';
import {MdDialog, MdDialogRef} from '@angular/material';
import {RaPopupDialog} from './rapopup.component';
import {MainRateAnalysis} from '../model/class/main-rate-analysis.model'
import {MaterialRateAnalysis} from '../model/class/line-item-material.model'
import {LabourRateAnalysis} from '../model/class/labour-rate-analysis.model'

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {FormControl} from '@angular/forms';
import {Http} from '@angular/http';


@Component({
  selector: 'app-rate-analysis',
  templateUrl: './rate-analysis.component.html',
  styleUrls: ['./rate-analysis.component.css']
})

export class RateAnalysisComponent implements OnInit {

  boqObj: {} = {};
  private materials: Observable<{}[]>;
  private materials1: {}[];

  private searchTerms: Subject<string>;

  queryField: FormControl = new FormControl();

  overhead: number;
  profit: number;
  wastage: number;
  selMaterial: {}= {};
  calcs1: {}[][] = [];
  calcs2: {}[] = [];

  cfList:any;
  cf_price:number=0;
  mainRateAnalysis:MainRateAnalysis;
  materialRateAnalysis:MaterialRateAnalysis;
  labourRateAnalysis:LabourRateAnalysis;
  itemRateAnalysis:MainRateAnalysis[]=[];

  // calcs3: RateAnalysis[][]=[];

  // old variable to be removed when api call is made it doesnt affeect anything
  rowItemsOld: LineItemTableRow[] = [{'id': 1, 'name': 'item1'}, {'id': 2, 'name': 'item2'},
    {'id': 3, 'name': 'item3'}, {'id': 4, 'name': 'item4'}];

  // variable for LineItem
  rowItems: LineItem[];

  // variable for grand total one for item rate analysis and other for overhead.
  grandTotalV: any;
  grandTotal2V: any;

  // dummy data list for dropdown for material
  dropList1: {}[] = [{'key': 'value1'}, {'key': 'value2'}, {'key': 'value3'}, {'key': 'value4'}];
  dropList2: {}[] = [{'key': 'value1'}, {'key': 'value2'}, {'key': 'value3'}, {'key': 'value4'}];
  filteredStates: any[] = ['sfsdF', 'fsdfs', 'dfsfsdf'];


  constructor(private restApiService: RestApiService, private _http: Http, private dialog: MdDialog) {
    this.searchTerms = new Subject<string>();
    // this.searchTerms.
  }

  // Push a search term into the observable stream.
  search1(term1: string): void {
    console.log(term1);
    this.searchTerms.next(term1);
    this.restApiService.getRequest('http://49.50.76.29/api/material/search?search='
      + term1 + '&filter[]=name&filter[]=srno&filter[]=brand')
      .map(res => res.json().data)
      .subscribe(
        (value) => {
          console.log(value);
        },
        (err: any) => console.log(err)
      );
    /*this.searchTerms
     /!*.debounceTime(300)        // wait 300ms after each keystroke before considering the term
     .distinctUntilChanged()*!/   // ignore if next search term is same as previous
     .switchMap(term => this.restApiService.search(term))
     .catch(error => {
     // TODO: add real error handling
     console.log(error);
     return Observable.of<{}>([]);
     });*/
    console.log(this.materials);
  }

  ngOnInit() {
    this.boqObj = this.restApiService.comm_obj;
    this.materials = this.searchTerms
    /*.debounceTime(300)        // wait 300ms after each keystroke before considering the term
     .distinctUntilChanged()*/   // ignore if next search term is same as previous
      .switchMap(term => this.restApiService.search(term))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<{}>([]);
      });
    console.log(this.boqObj['lineItems']);
    console.log();

    //this.materials=[{'name':"sdf"}]
    this.queryField.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap((query) =>  this.search(query))
      .subscribe( result => {  if (result.status === 400) { return; } else { this.materials1 = result.json().data; console.log(this.materials1) }
      });
  }

  search(queryString: string) {
    let _URL = 'http://49.50.76.29/api/material/search?search=' + queryString + '&filter[]=name&filter[]=srno&filter[]=brand&appends[]=coefficiency';
    return this._http.get(_URL);
  }

  src() {
    console.log(this.materials);
  }

  addMainRateAnalysis({}={}) {
    this.mainRateAnalysis=new MainRateAnalysis();
    this.itemRateAnalysis.push(this.mainRateAnalysis);
    this.lineItem.push({});
    this.addCF[this.calcs1.length-1]=[]
  }

  deleteMainRateAnalysis(i) {
    this.itemRateAnalysis.splice(i, 1);
    this.lineItem.splice(i, 1);
  }

  addMaterialRateAnalysis(i) {
    if (this.lineItem[i]['title']){
      this.materialRateAnalysis = new MaterialRateAnalysis();
      this.itemRateAnalysis[i].material_rate_analysis.push(this.materialRateAnalysis)
    }else{
      alert("Please Select The Line Item")
    }
  }

  addCF: {}[]= [];
  deleteMaterialRateAnalysis(i, j) {
    this.itemRateAnalysis[i].material_rate_analysis.splice(j, 1);
  }

  // get api request for line item
  getLineItems(id) {
    const url = '';

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: LineItem[]) => {
          this.rowItems = value;
        },
        (err: any) => {
          console.error(err);
        }
      );
    console.log('data returned %s', this.rowItems);
  }

  updateRow(material,i,j){
      this.itemRateAnalysis[i].material_rate_analysis[j]['lineItem_id']=this.lineItem[i]['id'];
      this.itemRateAnalysis[i].material_rate_analysis[j]['uom']=material['uom'];
      this.itemRateAnalysis[i].material_rate_analysis[j]['rate']=material['rate'];
      this.itemRateAnalysis[i].material_rate_analysis[j]['srno']=material['srno'];
      this.itemRateAnalysis[i].material_rate_analysis[j]['material_id']=material['id'];
      this.cfList=material['coefficiency']['cf_price'];
      //this.itemRateAnalysis[i].material_rate_analysis[j]['CF']=material['coefficiency']['cf_price'];
  }


  postItemRateAnalysis(i) {
    const url = 'http://49.50.76.29/api/ra/new';
    this.itemRateAnalysis[i].lineItem_id=this.lineItem[i]['id'];
    this.itemRateAnalysis[i].boq_id=this.boqObj['id'];
    this.itemRateAnalysis[i].profit_margin=this.profit/100*this.itemRateAnalysis[i].grand_total
    this.itemRateAnalysis[i].overhead_margin=this.overhead/100*this.itemRateAnalysis[i].grand_total

    for (var j = 0; j < this.itemRateAnalysis[i].labour_rate_analysis.length; j++) {
      this.itemRateAnalysis[i].labour_total=this.itemRateAnalysis[i].labour_total+
                                            this.itemRateAnalysis[i].labour_rate_analysis[j].amount;
    }

    this.restApiService.postRequest(url, this.itemRateAnalysis[i])
      .map(res => res.json())
      .subscribe(
        (value) => {value; console.log(value);},
        (err: any) => {console.error(err);}
      );
  }

  routeToFileUploadScreen() {

  }

  lineItem:{}[]=[];
  selLineItem(lineItem,i) {
    console.log(this.lineItem[i])
    this.lineItem[i] = lineItem;
    console.log(this.lineItem[i])
  }

  amountCalc(i,j){
    this.itemRateAnalysis[i].material_total=0
    for (let j = this.itemRateAnalysis[i].material_rate_analysis.length - 1; j >= 0; j--) {
      if (this.itemRateAnalysis[i].material_rate_analysis[j]['wastage']){
        this.itemRateAnalysis[i].material_rate_analysis[j]['amount']=this.itemRateAnalysis[i].material_rate_analysis[j]['length']*
                                                                 this.itemRateAnalysis[i].material_rate_analysis[j]['breadth']*
                                                                 this.itemRateAnalysis[i].material_rate_analysis[j]['thickness']*
                                                                 this.itemRateAnalysis[i].material_rate_analysis[j]['quantity']*
                                                                 (this.itemRateAnalysis[i].material_rate_analysis[j]['wastage']/100+1)*
                                                                 this.itemRateAnalysis[i].material_rate_analysis[j]['rate']*
                                                                 (this.overhead/100+1)*(this.profit/100+1)+
                                                                 +this.cf_price;
        this.itemRateAnalysis[i].material_total = this.itemRateAnalysis[i].material_total + this.itemRateAnalysis[i].material_rate_analysis[j]['amount']
      }else{
        console.log(this.wastage);
        this.itemRateAnalysis[i].material_rate_analysis[j]['amount']=this.itemRateAnalysis[i].material_rate_analysis[j]['length']*
                                                                 this.itemRateAnalysis[i].material_rate_analysis[j]['breadth']*
                                                                 this.itemRateAnalysis[i].material_rate_analysis[j]['thickness']*
                                                                 this.itemRateAnalysis[i].material_rate_analysis[j]['quantity']*
                                                                 this.itemRateAnalysis[i].material_rate_analysis[j]['rate']*
                                                                 (this.overhead/100+1)*(this.profit/100+1)*(this.wastage/100+1)+
                                                                 +this.cf_price;
        this.itemRateAnalysis[i].material_total = this.itemRateAnalysis[i].material_total + this.itemRateAnalysis[i].material_rate_analysis[j]['amount']
      }
      this.itemRateAnalysis[i].grand_total= +this.itemRateAnalysis[i].labour_total + this.itemRateAnalysis[i].material_total
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

  labourCalc:LabourRateAnalysis[]=[];
  lCalc:LabourRateAnalysis=new LabourRateAnalysis;
  openDialogSup(i) {
      const dialogRef = this.dialog.open(RaPopupDialog);
      dialogRef.afterClosed().subscribe(result => {
        this.itemRateAnalysis[i].labour_rate_analysis = result.data;
        this.itemRateAnalysis[i].labour_total= result.labour_total;
        this.itemRateAnalysis[i].grand_total=+this.itemRateAnalysis[i].material_total + +this.itemRateAnalysis[i].labour_total;
        // console.log(result);
      });
    }

}