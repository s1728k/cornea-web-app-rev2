import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {RestApiService} from '../services/rest-api-service.service';
import {ProjectResponseBOQUpload} from '../model/class/project-response';
import {BOQTable} from '../model/class/boq-table.model';
import * as Constants from '../shared/constants.globals';
import {BoqNameId} from '../model/class';
const URL = 'http://49.50.76.29:80/api/boq/file';

@Component({
  selector: 'app-boq-table',
  templateUrl: './boq-table.component.html',
  styleUrls: ['./boq-table.component.css']
})

export class BoqTableComponent implements OnInit, OnDestroy, AfterViewInit {
  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  public projectList: ProjectResponseBOQUpload[];
  toggleProject: {} = {};
  public boqList: BOQTable[];
  urlProject: string;
  urlBoq: string;
  toggleCreateView:boolean=false;
  boqSelected:{};

  constructor(private restApiService: RestApiService, private router: Router) {
    this.urlProject = Constants.BASE_URL_PROJECT + Constants.SERVICE_NAME_PROJECT
      + Constants.ACTION_ALL + '?visible[]=id&visible[]=name';
    this.urlBoq = Constants.BASE_URL_BOQ + Constants.SERVICE_NAME_BOQ
      + Constants.ACTION_ALL + '?appends[]=lineItems&hidden[]=created_at&hidden[]=updated_at';
  }

  ngOnInit() {
    this.restApiService.getRequest(this.urlProject)
      .map(res => /*this.projectList = <ProjectResponseBOQUpload[]>*/res.json().data)
      .subscribe(
        (value: ProjectResponseBOQUpload[]) => {
          this.projectList = value;
          console.log(value);
        },
        (err: any) => {
          console.error(err);
        }
      );
  };

  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = (item => {
      item.withCredentials = false;
    });
  }

  ngOnDestroy() {
    this.restApiService.comm_obj=this.boqSelected;
  }

  // http://192.168.0.205:9000/api/projects/all/visible[]=id&visible[]=name&appends[]=boq
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  getBoqList(project: ProjectResponseBOQUpload): void {
    this.restApiService.getRequest(this.urlBoq + '&conditions[project_id]=' + project.id)
      .map(response => response.json().data)
      .subscribe(
        (value) => {
          // project.boq = value;
          console.log(value);
          console.log('project id = %s \n condition = %s \n value= %s', project.id, (project.id === project.id), value);
          this.projectList[this.projectList.indexOf(project)].boq = value;
          console.log(this.projectList[this.projectList.indexOf(project)].boq);
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
    if(object.has_ra){
      this.toggleCreateView=true;
    }
    this.boqSelected=object
    /*this.restApiService.getRequest(Constants.BASE_URL_BOQ
     + Constants.SERVICE_NAME_BOQ + '/' + id)
     .map(res => /!*this.boqList = <BOQTable[]>*!/res.json().data)
     .subscribe(
     (value: BOQTable[]) => {
     this.boqList = value;
     },
     (err: any) => {
     console.error(err);
     }
     );*/
  }

  redirecToRateAnalysis(){
    this.router.navigate(['/pages/rate-analysis']);
  }
  redirectToUploadScreen(boq) {
    this.restApiService.comm_obj = boq;
    this.router.navigate(['/pages/files-upload']);
  }
}
