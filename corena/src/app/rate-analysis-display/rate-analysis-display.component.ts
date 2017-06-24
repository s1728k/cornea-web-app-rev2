import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {RestApiService} from '../services/rest-api-service.service';
import * as Constants from '../shared/constants.globals';

// ------------Imports for Charts---------------------------
import {ViewEncapsulation, ChangeDetectionStrategy, ContentChild, TemplateRef} from '@angular/core';
import {calculateViewDimensions} from '../shared';
import {ColorHelper} from '../shared';
import {BaseChartComponent} from "../shared";
import {single, multi} from '../shared';

// ------------Models Imported------------------------------
import {ProjectResponseBOQUpload} from '../model/class/project-response';
import {BOQTable} from '../model/class/boq-table.model';
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


const URL = 'http://49.50.76.29:80/api/boq/file';

@Component({
  selector: 'app-rate-analysis-display',
  templateUrl: './rate-analysis-display.component.html',
  styleUrls: ['./rate-analysis-display.component.css']
})

export class RateAnalysisDisplayComponent implements OnInit, OnDestroy {
  public boqList: BOQTable[];
  urlProject: string;
  urlBoq: string;
  toggleCreateView = false;


  boqSelected: BoqNameId;
  // list of objects with name and id of boq's
  // and related gra objects with title and id
  boqs: BoqNameIdRANameId[];

  lineItems: LineItem[];
  globalRateAnalysis: GlobalRateAnalysis = new GlobalRateAnalysis();
  globalRateAnalysisList: GlobalRateAnalysis[];

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

  constructor(private restApiService: RestApiService, private router: Router) {
    this.urlProject = Constants.BASE_URL_PROJECT + Constants.SERVICE_NAME_PROJECT
      + Constants.ACTION_ALL + '?visible[]=id&visible[]=name';
    this.urlBoq = Constants.BASE_URL_BOQ + Constants.SERVICE_NAME_BOQ
      + Constants.ACTION_ALL + '?appends[]=lineItems&hidden[]=created_at&hidden[]=updated_at';
  }

  ngOnInit() {
    // this.restApiService.getRequest(this.urlProject)
    //   .map(res => /*this.projectList = <ProjectResponseBOQUpload[]>*/res.json().data)
    //   .subscribe(
    //     (value: ProjectResponseBOQUpload[]) => {
    //       this.projectList = value;
    //       console.log(value);
    //     },
    //     (err: any) => {
    //       console.error(err);
    //     }
    //   );
    this.getBoqList();
  };


  ngOnDestroy() {
    // this.restApiService.comm_obj=this.boqSelected;
  }

  /**
   * function to call list of boq's related to all projects
   * will add the get value to boqs reference  variable
   */
  getBoqList(): void {
    const url = Constants.BASE_URL_BOQ + Constants.SERVICE_NAME_BOQ + Constants.ACTION_ALL + Constants.QUERY_SYMBOL
      + Constants.APPENDS_LINE_ITEM + Constants.URL_QUERY_ADDITION + Constants.HIDDEN_CREATED_AT_UPDATED_AT;
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

  updateBoqTable(object: BoqNameId): void {
    this.toggleCreateView = false;
    console.log(object.lineItems);
    this.boqList = object.lineItems;
    if (object.has_ra) {
      this.toggleCreateView = true;
    }
    this.boqSelected = object;
    this.lineItems = object.lineItems;
  }

  /**
   * function to call all gra objects for
   * each boq passed in the parameters
   * @param boq current boq for gra reference
   */
  getRateAnalysis(boq): void {
    console.log(boq.id);
    const url = Constants.BASE_URL_GLOBAL_RATE_ANALYSIS + Constants.SERVICE_NAME_GLOBAL_RATE_ANALYSIS
      + Constants.ACTION_ALL + Constants.QUERY_SYMBOL + Constants.CONDITION_BOQ_ID + String(boq.id)
      + Constants.URL_QUERY_ADDITION + Constants.VISIBLE_TITLE_ID;
    this.restApiService.getRequest(url)
      .map(response => response.json().data).filter(value => value.materialRateAnalysis !== null && value.labourRateAnalysis !== null)
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


  addLabourRateAnalysis(i) {
    this.globalRateAnalysisList[i].mainRateAnalysis[i].labourRateAnalysis.push(new LabourRateAnalysis());
  }


  /**
   * function to add new row to material rate analysis
   * and push to existing list
   * @param index
   */
  addMaterialRateAnalysis(index) {
    console.log('Entered addMaterialRateAnalysis');
    // if (this.lineItems[i]['title']){
    console.log('in add material' + index);
    console.log(this.globalRateAnalysisList[index]);

    this.globalRateAnalysisList[index].mainRateAnalysis[index].materialRateAnalysis.push(new MaterialRateAnalysis());
  }

  /**
   * function for handling data on material level
   * @param gra
   * @param boq
   */
  openGlobalRateAnalysis(gra: GenericNameId, boq: Object): void {
    console.log('ids for gra = %s of boq = %s', gra, boq['id']);
    console.log(boq['lineItems']);
    this.getMaterialReportUsageList(gra.id, boq['id']);
    this.lineItems = boq['lineItems'];
    this.restApiService.getRequest(Constants.BASE_URL_BOQ + Constants.SERVICE_NAME_GLOBAL_RATE_ANALYSIS
      + '/' + gra.id + Constants.QUERY_SYMBOL + Constants.APPENDS_QUERY_GRA_WITH_BOQ_ID)
      .map(response => response.json().data)
      .subscribe(
        (value) => {
          for (let index = 0; index <= (this.lineItems.length - 1); index++) {
            if (value[index]['line_item_id'] === this.lineItems[index] && value[index]['mainRateAnalysis']) {
              this.globalRateAnalysisList[index] = value[index];
            }
          }
        },
        (error) => console.log(error)
      );
    console.log('gra ');
    console.log(this.lineItems);
    console.log('GRA');
    // if (this.boqSelected !== null) {
    // this.boqSelected = null;
    // this.boqSelected.id = boq['id'];
    // this.boqSelected.lineItems = boq['lineItems'];
    // this.boqSelected.name = boq['name'];
    // this.lineItems = boq['lineItems'];
    // console.log(this.lineItems);
    // } else {
    // this.boqSelected.id = boq['id'];
    // this.boqSelected.lineItems = boq['lineItems'];
    // this.boqSelected.name = boq['name'];
    // }
    // this.globalRateAnalysis = globalRateAnalysis;
  }

  
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

  // /* redirecToRateAnalysis() {
  //  this.restApiService.comm_obj = this.boqSelected;
  //  this.restApiService.comm_obj['from'] = 'boq_table';
  //  this.router.navigate(['/pages/rate-analysis']);
  //  }*/
  //
  // /* // http://192.168.0.205:9000/api/projects/all/visible[]=id&visible[]=name&appends[]=boq
  //  public fileOverBase(e: any): void {
  //  this.hasBaseDropZoneOver = e;
  //  }
  //
  //  public fileOverAnother(e: any): void {
  //  this.hasAnotherDropZoneOver = e;
  //  }
  //  */
}
