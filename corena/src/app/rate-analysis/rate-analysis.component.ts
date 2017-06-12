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
  calcs1: RateAnalysis[][] = [];
  calcs2: RateAnalysis[] = [];
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
    let _URL = 'http://49.50.76.29/api/material/search?search=' + queryString + '&filter[]=name&filter[]=srno&filter[]=brand';
    return this._http.get(_URL);
  }

  src() {
    console.log(this.materials);
  }

  increment1({}={}) {
    this.calcs1.push([]);
    this.lineItem.push({});
    this.labourCalc.push(this.lCalc);
    this.addCF[this.calcs1.length-1]=[]
  }

  deleteTable1(i) {
    this.calcs1.splice(i, 1);
    this.lineItem.splice(i, 1);
    this.labourCalc.splice(i, 1);
  }

  addRow1(i) {
    this.calcs1[i].push({});
    this.calcs1[this.calcs1[i].length-1]['lineItem']={}
  }

  addCF: {}[]= [];
  deleteRow1(i, j) {
    this.calcs1[i].splice(j, 1);
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
      this.calcs1[i][j]['v4']=material['uom'];
      this.calcs1[i][j]['v6']=material['rate'];
      this.calcs1[i][j]['srno']=material['srno'];
      this.calcs1[i][j]['material_id']=material['id'];
      this.calcs1[i][j]['item_id']=material['id']
  }

  postData:MainRateAnalysis;
  mra:MaterialRateAnalysis[];
  submitRACalcs(i) {
    const url = 'http://49.50.76.29/api/ra/new';
    this.postData['lineItem_id']=this.lineItem[i]['id']
    this.postData['grand_total']=this.grandTotalV
    this.postData['profit_margin']=(this.profit/100+1)*this.grandTotalV
    this.postData['overhead_margin']=(this.overhead/100+1)*this.grandTotalV

    for (let j = 0; j < this.calcs1[i].length; j++) {
      this.mra[j]['lineItem_id']=this.calcs1[i]['lineItem']['id']
      this.mra[j]['material_id']=this.calcs1[i][j]['material_id']
      this.mra[j]['length']=this.calcs1[i][j]['length']
      this.mra[j]['breadth']=this.calcs1[i][j]['breadth']
      this.mra[j]['thickness']=this.calcs1[i][j]['thickness']
      this.mra[j]['uom']=this.calcs1[i][j]['uom']
      this.mra[j]['rate']=this.calcs1[i][j]['rate']
      this.mra[j]['amount']=this.calcs1[i][j]['amount']
      this.mra[j]['wastage']=this.calcs1[i][j]['wastage']
    }

    this.postData['material_rate_analysis']=this.mra
    this.postData['labour_rate_analysis']=this.labourCalc



  // labour_total: number;
  // material_total: number;

  // boq_id: number;

  // labour_rate_analysis: LabourRateAnalysis[];


    console.log(this.postData)
    this.restApiService.postRequest(url, this.postData)
      .map(res => res.json().data)
      .subscribe(
        (value: {}[]) => { console.log(value);},
        (err: any) => {console.error(err);}
      );
  }

  routeToFileUploadScreen() {

  }

  lineItem:{}[]=[];
  selLineItem(lineItem,i) {
    console.log(this.lineItem[i])
    this.lineItem[i] = lineItem;
    // this.calcs1[i]['lineItem']=lineItem;
    console.log(this.lineItem[i])
  }


  // ----clicking the grandTotal button will calculate the grandtotal as there need to have for loop---

  grandTotal(j) {
    this.grandTotalV = 0;
    for (let i = this.calcs1[j].length - 1; i >= 0; i--) {
      if (this.calcs1[i][j]['wastage']){
        this.grandTotalV = this.grandTotalV + this.calcs1[i][j]['length']*this.calcs1[i][j]['breadth']*this.calcs1[i][j]['thickness']*this.calcs1[i][j]['quantity']
        *(this.calcs1[i][j]['wastage']/100+1)*this.calcs1[i][j]['rate']*(this.overhead/100+1)*(this.profit/100+1);
      }else{
        this.grandTotalV = this.grandTotalV + this.calcs1[i][j]['length']*this.calcs1[i][j]['breadth']*this.calcs1[i][j]['thickness']*this.calcs1[i][j]['quantity']
        *this.calcs1[i][j]['rate']*(this.overhead/100+1)*(this.profit/100+1)*(this.wastage/100+1);
      }
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

  labourCalc:LabourRateAnalysis[];
  lCalc:LabourRateAnalysis=new LabourRateAnalysis;
  openDialogSup(i) {
      const dialogRef = this.dialog.open(RaPopupDialog);
      dialogRef.afterClosed().subscribe(result => {
        this.labourCalc[i] = result;
        console.log(this.labourCalc[i]);
      });
    }

}