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
import {GlobalRateAnalysis, LineItemLabour, LineItemMaterial} from '../model/class/global-rate-analysis.model'
import {MainRateAnalysis} from '../model/class/main-rate-analysis.model'
import {MaterialRateAnalysis} from '../model/class/line-item-material.model'
import {LabourRateAnalysis} from '../model/class/labour-rate-analysis.model'
import {LineItem} from '../model/class/line-item.model'
import {Material} from '../model/class/material.model'
import {Labour} from '../model/class/labour.model'
import {MaterialReportUsageList} from '../model/class/material-report-usage-list.model';


const URL = 'http://49.50.76.29:80/api/boq/file';

@Component({
  selector: 'app-rate-analysis-display',
  templateUrl: './rate-analysis-display.component.html',
  styleUrls: ['./rate-analysis-display.component.css']
})

export class RateAnalysisDisplayComponent implements OnInit, OnDestroy, AfterViewInit {
  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  public projectList: ProjectResponseBOQUpload[];
  toggleProject: {} = {};
  public boqList: BOQTable[];
  urlProject: string;
  urlBoq: string;
  toggleCreateView = false;


  boqSelected: BoqNameId;
  boqs: BoqNameId[];

  lineItems: LineItem[]
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

  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = (item => {
      item.withCredentials = false;
    });
  }

  ngOnDestroy() {
    // this.restApiService.comm_obj=this.boqSelected;
  }

  // http://192.168.0.205:9000/api/projects/all/visible[]=id&visible[]=name&appends[]=boq
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  getBoqList(): void {
    const url = 'http://49.50.76.29:80/api/boq/all?appends[]=lineItems&hidden[]=created_at&hidden[]=updated_at';
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

  getRateAnalysis(boq): void {
    console.log(boq);
    this.boqSelected = boq;
    this.lineItems = boq.lineItems;
    console.log(this.boqSelected);
    const url = 'http://49.50.76.29/api/gra/all?appends[]=mainRateAnalysis&appends[]=materialRateAnalysis&appends[]=labourRateAnalysis&conditions[boq_id]=' + String(boq.id);
    this.restApiService.getRequest(url)
      .map(response => response.json().data).filter(value => value.materialRateAnalysis !== null && value.labourRateAnalysis !== null)
      .subscribe(
        (value) => {
          this.globalRateAnalysisList = value;
          console.log(this.globalRateAnalysisList);
        },
        (error: any) => {
          console.log(error);
        },
      );
  }


  addLabourRateAnalysis(i) {
    this.globalRateAnalysisList[i].mainRateAnalysis[i].labourRateAnalysis.push(new LabourRateAnalysis());
  }


  addMaterialRateAnalysis(i) {
    console.log('Entered addMaterialRateAnalysis');
    // if (this.lineItems[i]['title']){
    console.log('in add material' + i);
    console.log(this.globalRateAnalysisList[i]);

      this.globalRateAnalysisList[i].mainRateAnalysis[i].materialRateAnalysis.push(new MaterialRateAnalysis());
  }

  openGlobalRateAnalysis(globalRateAnalysis) {
    console.log(globalRateAnalysis)
    this.getMaterialReportUsageList(globalRateAnalysis.id, this.boqSelected.id);
    this.globalRateAnalysis = globalRateAnalysis;
    console.log('GRA');
    console.log(this.globalRateAnalysis);
  }

  getMaterialReportUsageList(gra_id, boq_id) {
    console.log(gra_id);
    console.log(boq_id);
    // gra_id=1;
    // boq_id=1;
    const url = 'http://49.50.76.29/api/report/getMaterialUsageForRa?gra_id=' + String(gra_id) + '&boq_id=' + String(boq_id);
    console.log(url);
    this.restApiService.getRequest(url)
      .map(res => res.json().data)
      .subscribe(
        (value: MaterialReportUsageList[]) => {
          console.log(value)
          this.materialreportusagelist = value;
          console.log(this.materialreportusagelist);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  redirecToRateAnalysis() {
    this.restApiService.comm_obj = this.boqSelected;
    this.restApiService.comm_obj['from'] = 'boq_table';
    this.router.navigate(['/pages/rate-analysis']);
  }

  redirectToUploadScreen(object) {
    this.restApiService.comm_obj = object;
    this.restApiService.setUploadServiceName(Constants.SERVICE_NAME_BOQ);
    this.restApiService.setAdditionalParameter('project_id', object.id);
    this.router.navigate(['/pages/files-upload']);
  }

}
