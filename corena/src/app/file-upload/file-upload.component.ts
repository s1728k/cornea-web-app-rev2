import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {RestApiService} from '../services/rest-api-service.service';
import {ProjectResponseBOQUpload} from '../model/class/project-response';
import {BOQTable} from '../model/class/boq-table.model';
import * as Constants from '../shared/Constants';
const URL = 'http://49.50.76.29:8090/api/boq/file';

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
  toggleProject:{}={};
  public boqList: BOQTable[];
  urlProject: string;
  urlBoq: string;

  constructor(private restApiService: RestApiService) {
    this.urlProject = Constants.BASE_URL_PROJECT + Constants.SERVICE_NAME_PROJECT
      + Constants.ACTION_ALL + '?visible[]=id&visible[]=name';
    this.urlBoq = Constants.BASE_URL_BOQ + Constants.SERVICE_NAME_BOQ
      + Constants.ACTION_ALL + '?visible[]=id&visible[]=name';
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
          for (const project1 of this.projectList){
            if (project1.id === project.id){
              project1.boq = value;
              break;
            }
          }
        },
        (error: any) => {
          console.log(error);
        },
      );
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
