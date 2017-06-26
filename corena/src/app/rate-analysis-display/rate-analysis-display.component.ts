import {RestApiService} from '../services/rest-api-service.service';
import {Component, OnInit} from '@angular/core';
import {LineItemTableRow} from '../model/class';
import {NanPipe} from '../shared/pipes/nan.pipe';

import {Router} from '@angular/router';

import * as Constants from '../shared/constants.globals';

// ------------Imports for Charts---------------------------
import {ViewEncapsulation, ChangeDetectionStrategy, ContentChild, TemplateRef} from '@angular/core';
import {calculateViewDimensions} from '../shared';
import {ColorHelper} from '../shared';
import {BaseChartComponent} from '../shared';
import {single, multi} from '../shared';

// ------------Models Imported------------------------------
import {ProjectResponseBOQUpload} from '../model/class/project-response';
import {BoqNameId} from '../model/class/name-id.model';
import {GlobalRateAnalysis, LineItemLabour, LineItemMaterial} from '../model/class/global-rate-analysis.model';
import {MainRateAnalysis} from '../model/class/main-rate-analysis.model';
import {MaterialRateAnalysis} from '../model/class/line-item-material.model';
import {LabourRateAnalysis} from '../model/class/labour-rate-analysis.model';
import {LineItem} from '../model/class/line-item.model';
import {Material} from '../model/class/material.model';
import {Labour} from '../model/class/labour.model';
import {MaterialReportUsageList} from '../model/class/material-report-usage-list.model';
import {BoqNameIdRANameId} from '../model/class/boq-name-id-ra-name-id';
import {GenericNameId} from '../model/class/generic-name-id';

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

@Component({
  selector: 'app-rate-analysis-display',
  templateUrl: './rate-analysis-display.component.html',
  styleUrls: ['./rate-analysis-display.component.css']
})

export class RateAnalysisDisplayComponent implements OnInit {

  materials: Observable<Material[]>;
  materialSuggestion: Subject<string> = new Subject<string>();

  labours: Observable<Labour[]>;
  labourSuggestion: Subject<string> = new Subject<string>();

  overhead = 0;
  profit = 0;
  wastage = 0;
  cfList: any;
  cf_price = 0;

  gra_id:number=0;

  boqSelected: BoqNameIdRANameId;
  boqs: BoqNameIdRANameId[];

  lineItemLabour: LineItemLabour;
  lineItemMaterial: LineItemMaterial;
  newRateAnalysis: GlobalRateAnalysis = new GlobalRateAnalysis();
  rateAnalysisList: GlobalRateAnalysis[] = [];

  lineItems: LineItem[];

  materialRateAnalysis: MaterialRateAnalysis;

  labrRateAnalysis: LabourRateAnalysis;
  labourRateAnalysis: LabourRateAnalysis;

  mainRateAnalysis: MainRateAnalysis;
  itemRateAnalysis: MainRateAnalysis[] = [];

  //  ---------------space for charts-------------------------

  materialreportusagelist: MaterialReportUsageList[];

  // view: any[] = [700, 400];
  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };
  // setData(demo):any{
  //   let arr2=[];
  //   for (let key in demo){
  //     let arr = {'name':'','value':0};
  //     arr.name = key;
  //     arr.value = Number(demo[key]);
  //     arr2.push(arr);
  //   }
  //   console.log(arr2);
  //   return arr2;
  // }
  // demoInd:{} = {"pending":2,"draft":12,"unapproved":20,"approved":20,"closed":0};
  // singleInd:any[] = this.setData(this.demoInd);

  //  ---------------End of space for charts------------------

  constructor(private restApiService: RestApiService, private router: Router) { }

  ngOnInit() {

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

    this.labours = this.labourSuggestion
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.restApiService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Labour[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Labour[]>([]);
      });

    this.getBoqList();
  };

  searchMaterials(term: string) {
    console.log('Entered searchMaterials');
    const url = 'http://49.50.76.29/api/material/search?search='
      + term + '&filter[]=name&filter[]=srno&filter[]=brand';
    this.materialSuggestion.next(url);
  }

  searchLabours(term: string) {
    console.log('Entered searchLabour');
    const url = 'http://49.50.76.29/api/labour/search?search='
      + term + '&filter[]=name&filter[]=srno&filter[]=uom&filter[]=category&filter[]=age&filter[]=type&filter[]=rate';
    console.log(url);
    this.labourSuggestion.next(url);
  }


  /**
   * function to call list of boq's related to all projects
   * will add the get value to boqs reference  variable
   */
  getBoqList(): void {
    console.log('Entered getBoqList');
    const url = 'http://49.50.76.29/api/boq/all?appends[]=materials&appends[]=labours&appends[]=lineItems&hidden[]=created_at&hidden[]=updated_at&hidden[]=pivot';

    // const url = Constants.BASE_URL_BOQ + Constants.SERVICE_NAME_BOQ + Constants.ACTION_ALL + Constants.QUERY_SYMBOL
    //   + Constants.APPENDS_LINE_ITEM + Constants.URL_QUERY_ADDITION + Constants.HIDDEN_CREATED_AT_UPDATED_AT;

    this.restApiService.getRequest(url)
      .map(response => response.json().data)
      .subscribe(
        (value) => {
          this.boqs = value;
          console.log(this.boqs);
        },
        (error: any) => {
          console.log(error);
        },
      );
  }

  /**
   * function to call all gra objects for
   * each boq passed in the parameters
   * @param boq current boq for gra reference
   */

  getRateAnalysis(boq): void {
    console.log('Entered getRateAnalysis');
    console.log(boq.id);
    const url= 'http://49.50.76.29/api/gra/all?conditions[boq_id]=' + String(boq.id) + '&visible[]=title&visible[]=id'
    // const url = Constants.BASE_URL_GLOBAL_RATE_ANALYSIS + Constants.SERVICE_NAME_GLOBAL_RATE_ANALYSIS
    //   + Constants.ACTION_ALL + Constants.QUERY_SYMBOL + Constants.CONDITION_BOQ_ID + String(boq.id)
    //   + Constants.URL_QUERY_ADDITION + Constants.VISIBLE_TITLE_ID;
    this.restApiService.getRequest(url)
      .map(response => response.json().data)
      .subscribe(
        (value) => {
          console.log(value);
          if (value !== null) {
            this.boqs[this.boqs.indexOf(boq)].ra = value;
          }
        },
        (error: any) => {
          console.log(error);
        },
      );
  }

  openGlobalRateAnalysis(gra: GenericNameId, boq: BoqNameIdRANameId): void {
    console.log('ids for gra = %s of boq = %s', gra, boq['id']);
    console.log(boq['lineItems']);
    this.getMaterialReportUsageList(gra.id, boq['id']);
    this.lineItems = boq['lineItems'];
    console.log(this.lineItems.length)
    this.itemRateAnalysis=[];
    for (let i = 0; i < this.lineItems.length; i++) {
      this.addMainRateAnalysis();
      this.itemRateAnalysis[i].lineItem_id = this.lineItems[i]['id'];

      this.itemRateAnalysis[i].materialRateAnalysis=[];
      for (let j = 0; j < this.lineItems[i]['materials'].length; j++) {
        this.addMaterialRateAnalysis(i);
        this.itemRateAnalysis[i].materialRateAnalysis[j].lineItem_material_id = this.lineItems[i]['materials'][j]['id'];
      }
      console.log(this.itemRateAnalysis[i].materialRateAnalysis);
      console.log(i);


      this.itemRateAnalysis[i].labourRateAnalysis=[];
      for (let j = 0; j < this.lineItems[i]['labours'].length; j++) {
        this.addLabourRateAnalysis(i);
        this.itemRateAnalysis[i].labourRateAnalysis[j].lineItem_labour_id = this.lineItems[i]['labours'][j]['id'];;
      }
    }

    console.log(this.itemRateAnalysis);
    const url = 'HTTP://49.50.76.29:80/api/gra/' + String(gra.id) + '?appends[]=mainRateAnalysis&appends[]=materialRateAnalysis&appends[]=labourRateAnalysis'
    // const url=Constants.BASE_URL_BOQ + Constants.SERVICE_NAME_GLOBAL_RATE_ANALYSIS + '/' + gra.id + Constants.QUERY_SYMBOL + Constants.APPENDS_QUERY_GRA_WITH_BOQ_ID
    this.restApiService.getRequest(url)
      .map(response => response.json().data[0])
      .subscribe(
        (value) => {value;
          this.gra_id=value.id;
          let temp;
          for (let i = 0; i < value.mainRateAnalysis.length; i++) {
            temp=this.itemRateAnalysis.find(x => x.lineItem_id === value.mainRateAnalysis[i].lineItem_id);
            this.itemRateAnalysis[this.itemRateAnalysis.indexOf(temp)]=value.mainRateAnalysis[i];

            for (let j = 0; j < value.mainRateAnalysis[i].materialRateAnalysis.length; j++) {
              temp=this.itemRateAnalysis[i].materialRateAnalysis.find(x => x.lineItem_material_id === value.mainRateAnalysis[i].materialRateAnalysis[j].lineItem_material_id);
              this.itemRateAnalysis[i].materialRateAnalysis[this.itemRateAnalysis[i].materialRateAnalysis.indexOf(temp)]= value.mainRateAnalysis[i].materialRateAnalysis[j];
            }

            for (let j = 0; j < value.mainRateAnalysis[i].labourRateAnalysis.length; j++) {
              temp=this.itemRateAnalysis[i].labourRateAnalysis.find(x => x.lineItem_labour_id === value.mainRateAnalysis[i].labourRateAnalysis[j].lineItem_labour_id);
              this.itemRateAnalysis[i].labourRateAnalysis[this.itemRateAnalysis[i].labourRateAnalysis.indexOf(temp)]= value.mainRateAnalysis[i].labourRateAnalysis[j];;
            }
          }
        },
        (error) => console.log(error)
      );
  }

  addMainRateAnalysis() {
    // console.log('Entered addMainRateAnalysis');
    this.itemRateAnalysis.push(new MainRateAnalysis());
  }

  addMaterialRateAnalysis(index) {
    // console.log('Entered addMaterialRateAnalysis');
    // if (this.lineItems[i]['title']){
    // console.log(this.itemRateAnalysis[index].materialRateAnalysis);
    this.itemRateAnalysis[index].materialRateAnalysis.push(new MaterialRateAnalysis());
    // console.log(this.itemRateAnalysis[index].materialRateAnalysis);
    // console.log(this.lineItems[index])
    this.itemRateAnalysis[index].materialRateAnalysis
      [this.itemRateAnalysis[index].materialRateAnalysis.length - 1].wastage = this.wastage;
    // }else{
    //   alert("Please Select The Line Item")
    // }
  }

  deleteMaterialRateAnalysis(i, j) {
    // console.log('Entered deleteMaterialRateAnalysis');
    this.itemRateAnalysis[i].materialRateAnalysis.splice(j, 1);
  }

  materialTotal(index) {

    this.itemRateAnalysis[index].material_total = 0;
    let amount;

    for (let j = this.itemRateAnalysis[index].materialRateAnalysis.length - 1; j >= 0; j--) {

      if (this.itemRateAnalysis[index].materialRateAnalysis[j]['thickness']){
        this.itemRateAnalysis[index].materialRateAnalysis[j]['amount']=this.itemRateAnalysis[index].materialRateAnalysis[j]['length']*
                                                                       this.itemRateAnalysis[index].materialRateAnalysis[j]['breadth']*
                                                                       this.itemRateAnalysis[index].materialRateAnalysis[j]['thickness']*
                                                                       this.itemRateAnalysis[index].materialRateAnalysis[j]['quantity']*
                                                                       (this.itemRateAnalysis[index].materialRateAnalysis[j]['wastage']*1/100+1)*
                                                                       this.itemRateAnalysis[index].materialRateAnalysis[j]['rate']+
                                                                       this.cf_price
      }else{
        this.itemRateAnalysis[index].materialRateAnalysis[j]['amount']=this.itemRateAnalysis[index].materialRateAnalysis[j]['length']*
                                                                       this.itemRateAnalysis[index].materialRateAnalysis[j]['breadth']*
                                                                       this.itemRateAnalysis[index].materialRateAnalysis[j]['quantity']*
                                                                       (this.itemRateAnalysis[index].materialRateAnalysis[j]['wastage']*1/100+1)*
                                                                       this.itemRateAnalysis[index].materialRateAnalysis[j]['rate']+
                                                                       this.cf_price
      }
      this.itemRateAnalysis[index].material_total=this.itemRateAnalysis[index].material_total+this.itemRateAnalysis[index].materialRateAnalysis[j]['amount'];
    }

    this.grandTotal(index);
  }

  updateRow(material, i, j) {
    console.log('Entered updateRow');
    this.itemRateAnalysis[i].materialRateAnalysis[j]['lineItem_id'] = this.lineItems[i]['id'];
    this.itemRateAnalysis[i].materialRateAnalysis[j]['uom'] = material['uom'];
    this.itemRateAnalysis[i].materialRateAnalysis[j]['rate'] = material['rate'];
    this.itemRateAnalysis[i].materialRateAnalysis[j]['srno'] = material['srno'];
    this.itemRateAnalysis[i].materialRateAnalysis[j]['lineItem_material_id'] = material['id'];
    this.cfList = material['coefficiency']['cf_price'];
    // this.itemRateAnalysis[i].materialRateAnalysis[j]['CF']=material['coefficiency']['cf_price'];
  }

  addLabourRateAnalysis(i) {
    this.itemRateAnalysis[i].labourRateAnalysis.push(new LabourRateAnalysis());
  }

  deleteLabourRateAnalysis(i, j) {
    this.itemRateAnalysis[i].labourRateAnalysis.splice(j, 1);
  }

  updateLabourRow(labour, i, j) {
    console.log('Entered updateRow');
    console.log(labour);
    this.itemRateAnalysis[i].labourRateAnalysis[j]['uom'] = labour['uom'];
    this.itemRateAnalysis[i].labourRateAnalysis[j]['rate'] = labour['rate'];
    this.itemRateAnalysis[i].labourRateAnalysis[j]['lineItem_labour_id'] = labour['id'];
  }

  labourTotal(i) {
    this.itemRateAnalysis[i].labour_total = 0;
    for (let j = 0; j < this.itemRateAnalysis[i].labourRateAnalysis.length; j++) {
        if (this.itemRateAnalysis[i].labourRateAnalysis[j].thickness){
          this.itemRateAnalysis[i].labourRateAnalysis[j]['amount']=this.itemRateAnalysis[i].labourRateAnalysis[j]['length']*
                                                                   this.itemRateAnalysis[i].labourRateAnalysis[j]['breadth']*
                                                                   this.itemRateAnalysis[i].labourRateAnalysis[j]['thickness']*
                                                                   this.itemRateAnalysis[i].labourRateAnalysis[j]['rate'];
        }else{
          this.itemRateAnalysis[i].labourRateAnalysis[j]['amount']=this.itemRateAnalysis[i].labourRateAnalysis[j]['length']*
                                                                   this.itemRateAnalysis[i].labourRateAnalysis[j]['breadth']*
                                                                   this.itemRateAnalysis[i].labourRateAnalysis[j]['rate'];
        }
        this.itemRateAnalysis[i].labour_total = this.itemRateAnalysis[i].labour_total + this.itemRateAnalysis[i].labourRateAnalysis[j]['amount']
    }
    this.grandTotal(i);
  }

  postItemRateAnalysis(i: number) {

    console.log('Entered postItemRateAnalysis');
    const url = 'http://49.50.76.29/api/gra/new?appends[]=labourRateAnalysis&aappends[]=materialRateAnlysis';
    this.itemRateAnalysis[i].lineItem_id = this.lineItems[i]['id'];
    this.itemRateAnalysis[i].boq_id = this.lineItems[i]['boq_id'];

    this.newRateAnalysis.mainRateAnalysis = [this.itemRateAnalysis[i]];

    this.itemRateAnalysis[i].gra_id = this.gra_id;

    this.restApiService.postRequest(url, this.itemRateAnalysis[i])
      .map(res => res.json())
      .subscribe(
        (value) => {
          console.log(value);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  validatePostRequest(newRateAnalysis: GlobalRateAnalysis): void {
    if (!newRateAnalysis['title']) {
      alert('enter Title');
      return;
    }
    if (!newRateAnalysis['boq_id']) {
      alert('boq_id is not present');
      return;
    }
    if (newRateAnalysis.lineItem_labour) {
      for (let i = 0; i < newRateAnalysis.lineItem_labour.length; i++) {
        if (!newRateAnalysis.lineItem_labour[i]['line_item_id']) {
          alert('line_item_id @' + String(i) + 'is Not Present');
          return;
        }
        if (!newRateAnalysis.lineItem_labour[i]['master_labour_id']) {
          alert('master_labour_id @' + String(i) + 'is Not Present');
          return;
        }
      }
    } else {
      alert('lineItem_labour is Not Present');
      return;
    }
    if (newRateAnalysis.lineItem_material) {
      for (let i = 0; i < newRateAnalysis.lineItem_material.length; i++) {
        if (!newRateAnalysis.lineItem_material[i]['line_item_id']) {
          alert('line_item_id @' + String(i) + 'is Not Present');
          return;
        }
        if (!newRateAnalysis.lineItem_material[i]['master_material_id']) {
          alert('master_material_id @' + String(i) + 'is Not Present');
          return;
        }
      }
    } else {
      alert('lineItem_material is Not Present');
      return;
    }

    if (newRateAnalysis.mainRateAnalysis) {
      for (let i = 0; i < newRateAnalysis.mainRateAnalysis.length; i++) {
        if (!newRateAnalysis.mainRateAnalysis[i]['boq_id']) {
          alert('boq_id @' + String(i) + 'is Not Present');
          return;
        }
        if (!newRateAnalysis.mainRateAnalysis[i]['grand_total']) {
          alert('grand_total @' + String(i) + 'is Not Present');
          return;
        }
        if (!newRateAnalysis.mainRateAnalysis[i]['labour_total']) {
          alert('labour_total @' + String(i) + 'is Not Present');
          return;
        }
        if (!newRateAnalysis.mainRateAnalysis[i]['lineItem_id']) {
          alert('lineItem_id @' + String(i) + 'is Not Present');
          return;
        }
        if (!newRateAnalysis.mainRateAnalysis[i]['material_total']) {
          alert('material_total @' + String(i) + 'is Not Present');
          return;
        }
        if (!newRateAnalysis.mainRateAnalysis[i]['overhead_margin']) {
          alert('overhead_margin @' + String(i) + 'is Not Present');
          return;
        }
        if (!newRateAnalysis.mainRateAnalysis[i]['profit_margin']) {
          alert('profit_margin @' + String(i) + 'is Not Present');
          return;
        }
        if (newRateAnalysis.mainRateAnalysis[i].materialRateAnalysis) {
          for (let j = 0; j < newRateAnalysis.mainRateAnalysis[i].materialRateAnalysis.length; j++) {
            if (!newRateAnalysis.mainRateAnalysis[i].materialRateAnalysis[j]['amount']) {
              alert('amount @' + String(i) + 'is Not Present');
              return;
            }
          }
        } else {
          alert('materialRateAnalysis @' + String(i) + 'is Not Present');
          return;
        }
        if (newRateAnalysis.mainRateAnalysis[i].labourRateAnalysis) {
          for (let j = 0; j < newRateAnalysis.mainRateAnalysis[i].labourRateAnalysis.length; j++) {
            if (!newRateAnalysis.mainRateAnalysis[i].labourRateAnalysis[j]['amount']) {
              alert('amount @' + String(i) + 'is Not Present');
              return;
            }
          }
        } else {
          alert('labourRateAnalysis @' + String(i) + 'is Not Present');
          return;
        }

      }
    } else {
      alert('mainRateAnalysis is Not Present');
      return;
    }

  }

  overheadCurrection() {
    console.log('Entered overheadCurrection');
    for (let i = 0; i < this.itemRateAnalysis.length; i++) {
      this.grandTotal(i);
    }
  }

  profitCurrection() {
    console.log('Entered profitCurrection');
    for (let i = 0; i < this.itemRateAnalysis.length; i++) {
      this.grandTotal(i);
    }
  }

  wastageCurrection() {
    console.log('Entered wastageCurrection');
    for (let i = 0; i < this.itemRateAnalysis.length; i++) {
      this.grandTotal(i);
    }
  }

  grandTotal(i): void {
    console.log('Entered grandTotal');
    if (!this.itemRateAnalysis[i].labour_total) {
      this.itemRateAnalysis[i].labour_total = 0;
    }

    this.itemRateAnalysis[i].profit_margin = 0;
    this.itemRateAnalysis[i].overhead_margin = 0;
    this.itemRateAnalysis[i].grand_total = 0;


    this.itemRateAnalysis[i].profit_margin =
      (this.profit) / 100 * (this.itemRateAnalysis[i].labour_total + this.itemRateAnalysis[i].material_total);
    this.itemRateAnalysis[i].overhead_margin =
      (this.itemRateAnalysis[i].labour_total + this.itemRateAnalysis[i].material_total) * (this.overhead / 100);
    this.itemRateAnalysis[i].grand_total =
      (this.itemRateAnalysis[i].labour_total + this.itemRateAnalysis[i].material_total) * this.overhead / 100 +
      +(this.itemRateAnalysis[i].labour_total + this.itemRateAnalysis[i].material_total) * this.profit / 100
      + (this.itemRateAnalysis[i].labour_total + this.itemRateAnalysis[i].material_total);
    console.log(this.itemRateAnalysis[i].labour_total);
    console.log(this.itemRateAnalysis[i].material_total);
    console.log(this.itemRateAnalysis[i].profit_margin);
    console.log(this.itemRateAnalysis[i].overhead_margin);

  }




  /**
   * function for handling data on material level
   * @param gra
   * @param boq
   */



  getMaterialReportUsageList(gra_id, boq_id) {
    const url = Constants.BASE_URL_BOQ + Constants.SERVICE_NAME_REPORT +
      '/getMaterialUsageForRa?gra_id=' + String(gra_id) + '&boq_id=' + String(boq_id);
    console.log(url);
    this.restApiService.getRequest(url)
      .map(res => res.json().data)
      .subscribe(
        (value: MaterialReportUsageList[]) => {
          console.log(value);
          this.materialreportusagelist = value;
          console.log(this.materialreportusagelist);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  redirectToUploadScreen(object) {
    this.restApiService.comm_obj = object;
    this.restApiService.setUploadServiceName(Constants.SERVICE_NAME_BOQ);
    this.restApiService.setAdditionalParameter('project_id', object.id);
    this.router.navigate(['/pages/files-upload']);
  }

  calculateQuantityDisplay(i, j): number{
    let dimenVar = 1;
    if (isNaN(this.itemRateAnalysis[i].materialRateAnalysis[j].length)){
      dimenVar = this.itemRateAnalysis[i].materialRateAnalysis[j].length * dimenVar;
    }
    if (isNaN(this.itemRateAnalysis[i].materialRateAnalysis[j].breadth)) {
      dimenVar = this.itemRateAnalysis[i].materialRateAnalysis[j].breadth * dimenVar;
    }
    if (isNaN(this.itemRateAnalysis[i].materialRateAnalysis[j].thickness)) {
      dimenVar = this.itemRateAnalysis[i].materialRateAnalysis[j].thickness * dimenVar;
    }
    console.log(dimenVar * this.itemRateAnalysis[i].materialRateAnalysis[j]['quantity']);
    return dimenVar * this.itemRateAnalysis[i].materialRateAnalysis[j]['quantity'];
  }
  // itemRateAnalysis[i].labourRateAnalysis[j]['amount']
  calculateLabourAmount(i, j){
    let dimenVar = 1;
    if (isNaN(this.itemRateAnalysis[i].labourRateAnalysis[j].length)){
      dimenVar = this.itemRateAnalysis[i].labourRateAnalysis[j].length * dimenVar;
    }
    if (isNaN(this.itemRateAnalysis[i].labourRateAnalysis[j].breadth)) {
      dimenVar = this.itemRateAnalysis[i].labourRateAnalysis[j].breadth * dimenVar;
    }
    if (isNaN(this.itemRateAnalysis[i].labourRateAnalysis[j].thickness)) {
      dimenVar = this.itemRateAnalysis[i].labourRateAnalysis[j].thickness * dimenVar;
    }
    this.itemRateAnalysis[i].labourRateAnalysis[j].amount = this.itemRateAnalysis[i].labourRateAnalysis[j].rate;
  }

}
