import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {RestApiService} from '../services/rest-api-service.service';
import {ProjectResponseBOQUpload} from '../model/class/project-response';
import {BOQTable} from '../model/class/boq-table.model';
import * as Constants from '../shared/Constants';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  public projectList: ProjectResponseBOQUpload[];
  public boqList: BOQTable[];
  urlProject: string;
  urlBoq: string;

  constructor(private restApiService: RestApiService) {
    this.urlProject = Constants.BASE_URL_PROJECT + Constants.SERVICE_NAME_PROJECT
      + Constants.ACTION_ALL + 'visible[]=id&visible[]=name&appends[]=boq';
    this.urlBoq = Constants.BASE_URL_PROJECT + Constants.SERVICE_NAME_BOQ;
  }

  ngOnInit() {
    this.restApiService.getRequest(this.urlProject)
      .map(res => /*this.projectList = <ProjectResponseBOQUpload[]>*/res.json().data)
      .subscribe(
        (value: ProjectResponseBOQUpload[]) => {
          this.projectList = value;
        },
        (err: any) => {
          console.error(err); }
      );
  };

  // http://192.168.0.205:9000/api/projects/all/visible[]=id&visible[]=name&appends[]=boq
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  updateBoqTable(id: number): void {
    this.restApiService.getRequest(this.urlBoq + '/' + id)
      .map(res => /*this.boqList = <BOQTable[]>*/res.json().data)
      .subscribe(
        (value: BOQTable[]) => {
          this.boqList = value;
        },
        (err: any) => {
          console.error(err);
        }
      );
  }
}
