import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {RestApiService} from '../services/rest-api-service.service';
import {ProjectResponseBOQUpload} from '../model/class/project-response';
import {BOQTable} from '../model/class/boq-table.model';
import * as Constants from '../shared/constants.globals';
import {BoqNameId} from '../model/class';
import {KeyValue} from '../model/class/key-value';
import {DialogService} from '../shared/services/dialog/dialog.service';
import {LoaderService} from "../services/loader/loader.service";
// import {KeyValue} from '../model/class/key-value.model';
const URL = 'http://49.50.76.29:80/api/';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [DialogService]
})

export class FileUploadComponent implements OnInit, OnDestroy, AfterViewInit {
  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  public projectList: ProjectResponseBOQUpload[];
  toggleProject: {} = {};
  public boqList: BOQTable[];
  // the type for addition parameter is defined here
  public uploadType: string;
  someValue: number;
  urlProject: string;
  urlBoq: string;
  toggleCreateView = false;
  boqSelected: {};
  public result: any;
  listTypesOfFileUploads: KeyValue[] = [{key: 'Boq', value: 'boq'}
  , {key: 'Overheads', value: 'overhead'}
  , {key: 'Material', value: 'material'}
  , {key: 'Labour', value: 'labour'}];
  constructor(private restApiService: RestApiService, private router: Router, private dialogsService: DialogService, private loaderService: LoaderService) {
    this.urlProject = Constants.BASE_URL_PROJECT + Constants.SERVICE_NAME_PROJECT
      + Constants.ACTION_ALL + '?visible[]=id&visible[]=name';
    this.urlBoq = Constants.BASE_URL_BOQ + Constants.SERVICE_NAME_BOQ
      + Constants.ACTION_ALL + '?appends[]=lineItems&hidden[]=created_at&hidden[]=updated_at';
  }

  ngOnInit() {
    this.createUploader();
    // console.log(this.restApiService.comm_obj);
  };

  createUploader() {

    console.log(URL
      + this.uploadType + '/file');
    console.log(this.restApiService.additionParameter);
    this.uploader = new FileUploader({
      url: URL
      + this.uploadType + '/file'});
    // *additionalParameter: [{'project_id': this.restApiService.additionParameter, 'type': this.uploadType}]}*/
    this.uploader.onBuildItemForm  = (fileItem: any, form: any) => {
      form.append('project_id', this.restApiService.additionParameter);
      form.append('type', this.uploadType);
    };
    this.uploader.onAfterAddingFile = (item => {
      item.withCredentials = false;
    });
    console.log(this.uploader);
  }
  ngAfterViewInit() {
    console.log(this.uploader);
  }

  ngOnDestroy() {
    this.restApiService.comm_obj = this.boqSelected;
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
          this.hideLoader();
        },
        (error: any) => {
          console.log(error);
          this.dialogsService
            .errorNotification(error.status)
            .subscribe(res => this.result = res);
        },
      );
  }

  // This method is used to hide the loader
  private hideLoader(): void {
    this.loaderService.hide();
  }

  updateBoqTable(object: BoqNameId): void {
    this.toggleCreateView = false;
    console.log(object.lineItems);
    this.boqList = object.lineItems;
    if (object.has_ra) {
      this.toggleCreateView = true;
    }
    this.boqSelected = object;
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

  redirecToRateAnalysis() {
    this.router.navigate(['/pages/rate-analysis']);
  }
}
