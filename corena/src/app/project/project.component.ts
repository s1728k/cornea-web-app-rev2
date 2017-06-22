import {Component, OnInit, AfterViewInit} from '@angular/core';
import {RestApiService} from '../services/rest-api-service.service';

// ------models used-----------------
import {Project} from '../model/class/project';

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
import {DialogService} from '../shared/services/dialog/dialog.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [DialogService]
})
export class ProjectComponent implements OnInit, AfterViewInit {

  projects: Observable<Project[]>;
  searchLoad: Subject<string> = new Subject<string>(); // subject used to monitor materials observable
  searchTotal: Subject<string> = new Subject<string>(); // subject used to monitor total count of materials

  searchOpt: {}= {brand: '', modal: '', job: ''}; // empty object used to pass the individual column searched for
  ed: {}= {}; // boolean for editing mode
  lastSearchObj: {}= {}; // used as a token to identify request is comming from normal get request or general search or individual search
  trig:string=''; // manual trigger the searchLoad and searchTotal
  pageCount= 4;
  perPageCount= 2;
  activePage=0;
  public result: any;

  newProject: Project = new Project();


  constructor(private restApiService: RestApiService, private dialogsService: DialogService) {  }

  ngOnInit() {
    // this.getProjectList();

    this.projects = this.searchLoad
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => this.restApiService.search(term))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Project[]>([]);
      });

    this.searchTotal
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap((term)=> this.restApiService.getLength(term))
      .subscribe((value)=>{this.pageCount = value; console.log(this.pageCount)})

  }

  ngAfterViewInit(){
    // console.log('ngAfterViewInit')
    this.getProjects(0);
    this.activePage=0
  }

  perPageCountChange(perPageCount) {
    // console.log('Entered page count change')
    // console.log(perPageCount)
    this.perPageCount=perPageCount;
    this.getProjects(0);
    this.activePage=0
  }

  selectPage(p) {
    // console.log('Entered select page')
    // console.log(p)
    // console.log(this.lastSearchObj['from'])
    this.trig=(this.trig==='sel')?this.trig+'1':'sel'
    this.activePage = p;
    switch (this.lastSearchObj['from']) {
      case 'full':
        this.generalFilter(this.lastSearchObj['1'], p);
        break;

      case 'ind':
        this.individualFilter(this.lastSearchObj['1'], this.lastSearchObj['2'], p)
        break;

      case 'start':
        this.getProjects(p)
        break;

      default:
        // code...
        break;
    }
  }

  getProjects(n) {
    // console.log('Entered get materials')
    // console.log(n)
    this.lastSearchObj = {'from': 'start', '1': n};

    let url = 'http://49.50.76.29:8090/api/project/search?search=&filter[]=name&filter[]=start_date&filter[]=end_date';

    this.searchLoad.next(url);

    url = 'http://49.50.76.29:8090/api/project/search?search=&filter[]=name&filter[]=start_date&filter[]=end_date';

    this.searchTotal.next(url);
  }


  postProject() {
    // console.log('Entered postProject')
    const url = 'http://49.50.76.29:8090/api/project/new';
    // console.log(this.newProject);
    this.restApiService.postRequest(url, this.newProject)
      .map(res => res.json().data[0])
      .subscribe(
        (value: Project) => {
          this.newProject = value;
          // console.log(this.newProject);
          this.newProject = new Project();
          this.selectPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .errorNotification(err.status)
            .subscribe(res => this.result = res);
        }
      );
  }

  putProject(project) {
    // console.log('Entered put project')
    // console.log(project)
    const url = 'http://49.50.76.29:8090/api/project/' + String(project.id);
    // console.log(project)
    this.restApiService.putRequest(url, project)
      .map(res => res.json().data)
      .subscribe(
        (value: Project) => {
          this.newProject = value;
          // console.log(this.newProject)
          this.selectPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .errorNotification(err.status)
            .subscribe(res => this.result = res);
        }
      );
  }

  deleteProject(project) {
    // console.log('Entered delete project')
    // console.log(project)
    const url = 'http://49.50.76.29:8090/api/project/' + String(project.id);

    this.restApiService.deleteRequest(url)
      .map(res => res.json().data)
      .subscribe(
        (value: Project) => {
          this.newProject = value;
          // console.log(this.newProject)
          this.selectPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .errorNotification(err.status)
            .subscribe(res => this.result = res);
        }
      );
  }

  generalFilter(event, n) {
    // console.log('Entered general filter')
    let val;
    if (event) {
      val = event.target.value.toLowerCase();
      console.log(val);
    } else {
      val = '';
    }
    // console.log(val)
    // console.log(n)
    console.log(val);
    this.lastSearchObj = {'from': 'full', '1': val, '2': n};

    let url = 'http://49.50.76.29:8090/api/project/search?search=' + val +
      '&filter[]=name&filter[]=start_date&filter[]=end_date&perPage=' +
      String(this.perPageCount) + '&page=' + String(n);
    console.log(val);
    this.searchLoad.next(url);
    console.log(val);
    url = 'http://49.50.76.29:8090/api/project/search?search=' + val +
      '&filter[]=name&filter[]=start_date&filter[]=end_date&perPage=' +
      String(1) + '&page=' + String(0);

    this.searchTotal.next(url);

  }


  individualFilter(sParam, k, n) {
    // console.log('Entered individual filter')
    // console.log(sParam)
    // console.log(k)
    // console.log(n)

    this.lastSearchObj = {'from': 'ind', '1': sParam, '2': k, '3': n};

    let url = 'http://49.50.76.29:8090/api/project/search?search=' + sParam[k] +
      '&filter[]=' + k + '&perPage=' +
      String(this.perPageCount) + '&page=' + String(n);


    this.searchLoad.next(url)


    url = 'http://49.50.76.29:8090/api/project/search?search=' + sParam[k] +
      '&filter[]=' + k + '&perPage=' +
      String(1) + '&page=' + String(0);

    this.searchTotal.next(url);

  }

}
