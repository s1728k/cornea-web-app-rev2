import {RestApiService} from '../services/rest-api-service.service';
import {Component, OnInit} from '@angular/core';
import {LineItemTableRow} from '../model/class';
import {NanPipe} from '../shared/pipes/nan.pipe';
import {MdDialog, MdDialogRef} from '@angular/material';
import {RaPopupDialog} from './rapopup.component';

// ------------Imports for Charts---------------------------
import { ViewEncapsulation, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';
import { calculateViewDimensions } from '../shared';
import { ColorHelper } from '../shared';
import {BaseChartComponent} from "../shared";
import {single , multi} from '../shared';

// ------------Models Imported------------------------------
import {ProjectResponseBOQUpload} from '../model/class/project-response';
import {BoqNameId} from '../model/class/name-id.model';
import {GlobalRateAnalysis, LineItemLabour, LineItemMaterial} from '../model/class/global-rate-analysis.model'
import {MainRateAnalysis} from '../model/class/main-rate-analysis.model'
import {MaterialRateAnalysis} from '../model/class/line-item-material.model'
import {LabourRateAnalysis} from '../model/class/labour-rate-analysis.model'
import {LineItem} from '../model/class/line-item.model'
import {Material} from '../model/class/material.model'
import {Labour} from '../model/class/labour.model'
import {MaterialReportUsageList} from '../model/class/material-report-usage-list.model';

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
  selector: 'app-rate-analysis',
  templateUrl: './rate-analysis.component.html',
  styleUrls: ['./rate-analysis.component.css']
})

export class RateAnalysisComponent implements OnInit {

  materials: Observable<Material[]>;
  materialSuggestion:Subject<string> = new Subject<string>();

  labours: Observable<Labour[]>;
  labourSuggestion:Subject<string> = new Subject<string>();

  calcs2: {}[] = [];

  overhead: number=0;
  profit: number=0;
  wastage: number=0;
  cfList:any;
  cf_price:number=0;
  dl:{}={}; //boolean array to hide and open the line items.
  titleRateAnalysis:string="";

  projectSelected:ProjectResponseBOQUpload;
  projects: ProjectResponseBOQUpload[];

  boqSelected:BoqNameId;
  boqs:BoqNameId[];

  lineItemLabour:LineItemLabour;
  lineItemMaterial:LineItemMaterial;
  newRateAnalysis:GlobalRateAnalysis = new GlobalRateAnalysis();
  rateAnalysisList:GlobalRateAnalysis[]=[];

  lineItems: LineItem[];

  materialRateAnalysis:MaterialRateAnalysis;

  labrRateAnalysis: LabourRateAnalysis;
  labourRateAnalysis:LabourRateAnalysis;

  mainRateAnalysis:MainRateAnalysis;
  itemRateAnalysis:MainRateAnalysis[]=[];


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

  // variable for grand total one for item rate analysis and other for overhead.
  grandTotal2V: any;

  constructor(private restApiService: RestApiService, private dialog: MdDialog) {}

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

    if(this.restApiService.comm_obj['from']==="boq_table"){
      this.restApiService.comm_obj['from']="";
      this.lineItems = this.restApiService.comm_obj['lineItems'];
      for (let i = 0; i < this.lineItems.length; i++) {
        this.addMainRateAnalysis();
        this.lineItems[i]
      }
      console.log(this.lineItems);
    }
    this.getProjectList();
    this.getMaterialReportUsageList();
  }

  getProjectList(): void {
    console.log("Entered getProjectList")
    const url ="http://49.50.76.29:8090/api/project/1?visible[]=id&visible[]=name"
    this.restApiService.getRequest(url)
      .map(response => response.json().data)
      .subscribe( (value)=> {
        console.log(value);
          this.projects = value;
        },
        (error: any) => {
          console.log(error);
        },
      );
  }

  getBoqList(project: ProjectResponseBOQUpload): void {
    console.log("Entered getBoqList")
    console.log(project)
    this.projectSelected=project
    const url ="http://49.50.76.29/api/boq/all?appends[]=lineItems&hidden[]=created_at&hidden[]=updated_at&conditions[project_id]=" + project.id
    this.restApiService.getRequest(url)
      .map(response => response.json().data)
      .subscribe(
        (value) => {
          console.log(value);
          this.boqs = value;
          console.log(this.boqs);
        },
        (error: any) => {
          console.log(error);
        },
      );
  }

  getRateAnalysisList(boq: BoqNameId): void {
    console.log("Entered getRateAnalysisList")
    console.log(boq)
    this.boqSelected=boq
    const url ="http://49.50.76.29/api/gra/all?appends[]=mainRateAnalysis&appends[]=labourCalculations&conditions[boq_id]=1"
    console.log(url)
    this.restApiService.getRequest(url)
      .map(response => response.json().data)
      .subscribe(
        (value) => {
          this.rateAnalysisList = value;
          console.log(this.rateAnalysisList);
        },
        (error: any) => {
          console.log(error);
        },
      );
  }

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

  createNewRateAnalysis(): void{
    console.log("Entered createNewRateAnalysis")
    for (let i = 0; i < this.boqSelected['lineItems'].length; i++) {
      this.addMainRateAnalysis();
    }
    this.lineItems = this.boqSelected['lineItems'];
    console.log(this.lineItems);
    // this.grandTotal(0);
    // this.grandTotal(this.lineItems.length-1);
  }

  deleteRateAnalysis(): void{
    console.log("Entered deleteRateAnalysis")

  }

  openRateAnalysis(): void{
    console.log("Entered openRateAnalysis")

  }

  searchMaterials(term: string){
    console.log("Entered searchMaterials")
    const url ="http://49.50.76.29/api/material/search?search=" + term + "&filter[]=name&filter[]=srno&filter[]=brand"
    this.materialSuggestion.next(url);
  }

  searchLabours(term: string){
    console.log("Entered searchMaterials")
    const url ="http://49.50.76.29/api/labour/search?search="+term+"&filter[]=name&filter[]=srno&filter[]=uom&filter[]=category&filter[]=age&filter[]=type&filter[]=rate"
    this.labourSuggestion.next(url);
  }

  addMainRateAnalysis() {
    console.log("Entered addMainRateAnalysis")
    this.itemRateAnalysis.push(new MainRateAnalysis())
    console.log(this.itemRateAnalysis)
  }

  deleteMainRateAnalysis(i) {
    console.log("Entered deleteMainRateAnalysis")
    this.itemRateAnalysis.splice(i, 1);
    console.log(this.itemRateAnalysis)
  }

  addMaterialRateAnalysis(i) {
    console.log("Entered addMaterialRateAnalysis")
    // if (this.lineItems[i]['title']){
      console.log(this.newRateAnalysis);
      this.itemRateAnalysis[i].materialRateAnalysis.push(new MaterialRateAnalysis())
    // }else{
    //   alert("Please Select The Line Item")
    // }
  }

  deleteMaterialRateAnalysis(i, j) {
    console.log("Entered deleteMaterialRateAnalysis")
    this.itemRateAnalysis[i].materialRateAnalysis.splice(j, 1);
  }

  materialTotal(i){
    this.itemRateAnalysis[i].material_total = 0;
    let amount;
    for (let j = this.itemRateAnalysis[i].materialRateAnalysis.length - 1; j >= 0; j--) {
      this.itemRateAnalysis[i].materialRateAnalysis[j]['amount']=0;
      if (this.itemRateAnalysis[i].materialRateAnalysis[j]['wastage']){
        this.itemRateAnalysis[i].materialRateAnalysis[j]['amount']=this.itemRateAnalysis[i].materialRateAnalysis[j]['length']*
                                                                 this.itemRateAnalysis[i].materialRateAnalysis[j]['breadth']*
                                                                 this.itemRateAnalysis[i].materialRateAnalysis[j]['thickness']*
                                                                 this.itemRateAnalysis[i].materialRateAnalysis[j]['quantity']*
                                                                 (this.itemRateAnalysis[i].materialRateAnalysis[j]['wastage']/100+1)*
                                                                 this.itemRateAnalysis[i].materialRateAnalysis[j]['rate']*
                                                                 (this.overhead/100+1)*(this.profit/100+1)+
                                                                 +this.cf_price;
        amount=this.itemRateAnalysis[i].materialRateAnalysis[j]['amount']
        amount=isNaN(amount)?0:amount
        this.itemRateAnalysis[i].material_total = this.itemRateAnalysis[i].material_total + amount
      }else{
        console.log(this.wastage);
        this.itemRateAnalysis[i].materialRateAnalysis[j]['amount']=this.itemRateAnalysis[i].materialRateAnalysis[j]['length']*
                                                                 this.itemRateAnalysis[i].materialRateAnalysis[j]['breadth']*
                                                                 this.itemRateAnalysis[i].materialRateAnalysis[j]['thickness']*
                                                                 this.itemRateAnalysis[i].materialRateAnalysis[j]['quantity']*
                                                                 this.itemRateAnalysis[i].materialRateAnalysis[j]['rate']*
                                                                 (this.overhead/100+1)*(this.profit/100+1)*(this.wastage/100+1)+
                                                                 +this.cf_price;
        amount=this.itemRateAnalysis[i].materialRateAnalysis[j]['amount']
        amount=isNaN(amount)?0:amount
        this.itemRateAnalysis[i].material_total = this.itemRateAnalysis[i].material_total + amount
      }
    }
    this.grandTotal(i);
  }

  updateRow(material,i,j){
    console.log("Entered updateRow")
      this.itemRateAnalysis[i].materialRateAnalysis[j]['lineItem_id']=this.lineItems[i]['id'];
      this.itemRateAnalysis[i].materialRateAnalysis[j]['uom']=material['uom'];
      this.itemRateAnalysis[i].materialRateAnalysis[j]['rate']=material['rate'];
      this.itemRateAnalysis[i].materialRateAnalysis[j]['srno']=material['srno'];
      this.itemRateAnalysis[i].materialRateAnalysis[j]['material_id']=material['id'];
      this.cfList=material['coefficiency']['cf_price'];
      //this.itemRateAnalysis[i].materialRateAnalysis[j]['CF']=material['coefficiency']['cf_price'];
  }

  addLabourRateAnalysis(i){
      this.itemRateAnalysis[i].labourRateAnalysis.push(new LabourRateAnalysis())
  }

  deleteLabourRateAnalysis(i,j){
      this.itemRateAnalysis[i].labourRateAnalysis.splice(j, 1);
  }

  updateLabourRow(labour,i,j){
    console.log("Entered updateRow")
    console.log(labour);
      this.itemRateAnalysis[i].labourRateAnalysis[j]['uom']=labour['uom'];
      this.itemRateAnalysis[i].labourRateAnalysis[j]['rate']=labour['rate'];
      this.itemRateAnalysis[i].labourRateAnalysis[j]['lineItem_labour_id']=labour['id'];
  }

  labourTotal(i){
    this.itemRateAnalysis[i].labour_total=0
    for (let j = 0; j < this.itemRateAnalysis[i].labourRateAnalysis.length; j++) {
      this.itemRateAnalysis[i].labourRateAnalysis[j]['amount'] = this.itemRateAnalysis[i].labourRateAnalysis[j]['breadth'] *
                                             this.itemRateAnalysis[i].labourRateAnalysis[j]['thickness'] *
                                             this.itemRateAnalysis[i].labourRateAnalysis[j]['rate'];
      this.itemRateAnalysis[i].labour_total = this.itemRateAnalysis[i].labour_total + this.itemRateAnalysis[i].labourRateAnalysis[j]['amount'];
    }
    this.grandTotal(i);
  }

  postItemRateAnalysis(i) {
    console.log("Entered postItemRateAnalysis")
    const url = 'http://49.50.76.29/api/ra/new?appends[]=labourRateAnalysis&aappends[]=materialRateAnlysis';
    this.itemRateAnalysis[i].lineItem_id=this.lineItems[i]['id'];
    this.itemRateAnalysis[i].boq_id=this.lineItems[i]['boq_id'];
    this.itemRateAnalysis[i].profit_margin=this.profit/100*this.itemRateAnalysis[i].grand_total
    this.itemRateAnalysis[i].overhead_margin=this.overhead/100*this.itemRateAnalysis[i].grand_total

    this.newRateAnalysis.mainRateAnalysis=[this.itemRateAnalysis[i]]

    this.lineItemLabour = new LineItemLabour();
    this.newRateAnalysis.lineItem_labour=[];
    for (var j = 0; j < this.itemRateAnalysis[i].labourRateAnalysis.length; j++) {
      this.lineItemLabour.line_item_id=this.lineItems[i]['id']
      console.log(this.itemRateAnalysis[i].labourRateAnalysis[j])
      this.lineItemLabour.master_labour_id=this.itemRateAnalysis[i].labourRateAnalysis[j].lineItem_labour_id
      this.newRateAnalysis.lineItem_labour.push(this.lineItemLabour)
    }

    this.lineItemMaterial = new LineItemMaterial();
    this.newRateAnalysis.lineItem_material=[];
    for (var j = 0; j < this.itemRateAnalysis[i].materialRateAnalysis.length; j++) {
      this.lineItemMaterial.line_item_id=this.lineItems[i]['id']
      this.lineItemMaterial.master_material_id=this.itemRateAnalysis[i].materialRateAnalysis[j].material_id
      this.newRateAnalysis.lineItem_material.push(this.lineItemMaterial);
    }

    this.newRateAnalysis.boq_id=this.itemRateAnalysis[i].boq_id;
    console.log(this.newRateAnalysis);
    this.validatePostRequest(this.newRateAnalysis);
    this.restApiService.postRequest(url, this.newRateAnalysis)
      .map(res => res.json())
      .subscribe(
        (value) => {value; console.log(value);},
        (err: any) => {console.error(err);}
      );
  }

  validatePostRequest(newRateAnalysis:GlobalRateAnalysis): void{
    if(!newRateAnalysis['title']){
      alert("enter Title")
      return
    }
    if(!newRateAnalysis['boq_id']){
      alert("boq_id is not present")
      return
    }
    if(newRateAnalysis.lineItem_labour){
      for (var i = 0; i < newRateAnalysis.lineItem_labour.length; i++) {
        if(!newRateAnalysis.lineItem_labour[i]['line_item_id']){
          alert("line_item_id @"+String(i) + "is Not Present" )
          return
        }
        if(!newRateAnalysis.lineItem_labour[i]['master_labour_id']){
          alert("master_labour_id @"+String(i) + "is Not Present" )
          return
        }
      }
    }else{
      alert("lineItem_labour is Not Present" )
      return
    }
    if(newRateAnalysis.lineItem_material){
      for (var i = 0; i < newRateAnalysis.lineItem_material.length; i++) {
        if(!newRateAnalysis.lineItem_material[i]['line_item_id']){
          alert("line_item_id @"+String(i) + "is Not Present" )
          return
        }
        if(!newRateAnalysis.lineItem_material[i]['master_material_id']){
          alert("master_material_id @"+String(i) + "is Not Present" )
          return
        }
      }
    }else{
      alert("lineItem_material is Not Present" )
      return
    }

    if(newRateAnalysis.mainRateAnalysis){
      for (var i = 0; i < newRateAnalysis.mainRateAnalysis.length; i++) {
        if(!newRateAnalysis.mainRateAnalysis[i]['boq_id']){
          alert("boq_id @"+String(i) + "is Not Present" )
          return
        }
        if(!newRateAnalysis.mainRateAnalysis[i]['grand_total']){
          alert("grand_total @"+String(i) + "is Not Present" )
          return
        }
        if(!newRateAnalysis.mainRateAnalysis[i]['labour_total']){
          alert("labour_total @"+String(i) + "is Not Present" )
          return
        }
        if(!newRateAnalysis.mainRateAnalysis[i]['lineItem_id']){
          alert("lineItem_id @"+String(i) + "is Not Present" )
          return
        }
        if(!newRateAnalysis.mainRateAnalysis[i]['material_total']){
          alert("material_total @"+String(i) + "is Not Present" )
          return
        }
        if(!newRateAnalysis.mainRateAnalysis[i]['overhead_margin']){
          alert("overhead_margin @"+String(i) + "is Not Present" )
          return
        }
        if(!newRateAnalysis.mainRateAnalysis[i]['profit_margin']){
          alert("profit_margin @"+String(i) + "is Not Present" )
          return
        }
        if(newRateAnalysis.mainRateAnalysis[i].materialRateAnalysis){
          for (var j = 0; j < newRateAnalysis.mainRateAnalysis[i].materialRateAnalysis.length; j++) {
            if(!newRateAnalysis.mainRateAnalysis[i].materialRateAnalysis[j]['amount']){
              alert("amount @"+String(i) + "is Not Present" )
              return
            }
          }
        }else{
          alert("materialRateAnalysis @"+String(i) + "is Not Present" )
          return
        }
        if(newRateAnalysis.mainRateAnalysis[i].labourRateAnalysis){
          for (var j = 0; j < newRateAnalysis.mainRateAnalysis[i].labourRateAnalysis.length; j++) {
            if(!newRateAnalysis.mainRateAnalysis[i].labourRateAnalysis[j]['amount']){
              alert("amount @"+String(i) + "is Not Present" )
              return
            }
          }
        }else{
          alert("labourRateAnalysis @"+String(i) + "is Not Present" )
          return
        }

      }
    }else{
      alert("mainRateAnalysis is Not Present" )
      return
    }

  }

  routeToFileUploadScreen() {

  }

  overheadCurrection(){
    console.log("Entered overheadCurrection")
    for (var i = 0; i < this.itemRateAnalysis.length; i++) {
      this.grandTotal(i);
    }
  }

  profitCurrection(){
    console.log("Entered profitCurrection")
    for (var i = 0; i < this.itemRateAnalysis.length; i++) {
      this.grandTotal(i);
    }
  }

  wastageCurrection(){
    console.log("Entered wastageCurrection")
    for (var i = 0; i < this.itemRateAnalysis.length; i++) {
      this.grandTotal(i);
    }
  }

  grandTotal(i){
    console.log("Entered grandTotal")
    if (!this.itemRateAnalysis[i].labour_total){
      this.itemRateAnalysis[i].labour_total=0
    }

    this.itemRateAnalysis[i].profit_margin = 0;
    this.itemRateAnalysis[i].overhead_margin = 0;
    this.itemRateAnalysis[i].grand_total = 0

      this.itemRateAnalysis[i].grand_total= +this.itemRateAnalysis[i].labour_total + this.itemRateAnalysis[i].material_total
      this.itemRateAnalysis[i].profit_margin=this.profit/100*this.itemRateAnalysis[i].grand_total
      this.itemRateAnalysis[i].overhead_margin=this.overhead/100*this.itemRateAnalysis[i].grand_total
      console.log(this.itemRateAnalysis[i].labour_total)
      console.log(this.itemRateAnalysis[i].material_total)
      console.log(this.itemRateAnalysis[i].profit_margin)
      console.log(this.itemRateAnalysis[i].overhead_margin)

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
        this.itemRateAnalysis[i].labourRateAnalysis = result.data;
        this.itemRateAnalysis[i].labour_total= result.labour_total;
        this.itemRateAnalysis[i].grand_total=+this.itemRateAnalysis[i].material_total + +this.itemRateAnalysis[i].labour_total;
        // console.log(result);
      });
    }



}