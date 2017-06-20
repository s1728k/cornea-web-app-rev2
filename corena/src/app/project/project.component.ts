import {Component, OnInit} from '@angular/core';
import {Project} from '../model/class/project';
import {RestApiService} from '../services/rest-api-service.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Observable<Project[]>;
  pageCount = 4;
  searchLoad: Subject<string> = new Subject<string>(); // subject used to monitor materials observable
  searchTotal: Subject<string> = new Subject<string>(); // subject used to monitor total count of materials
  perPageCount = 2;
  // newProject: Project[];
  newProject: Project = new Project();
  ed: {} = {};
  lastSearchObj: {} = {};
  activePage = 0;


  constructor(private restApiService: RestApiService) {
  }

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
      .switchMap((term) => this.restApiService.getLength(term))
      .subscribe((value) => {
        this.pageCount = value
      })

  }

  perPageCountChange(perPageCount) {
    // console.log('Entered page count change')
    // console.log(perPageCount)
    this.perPageCount = perPageCount;


  }

  // Method to get the projectlist data
  getProjectList() {
    const url = 'http://49.50.76.29:8090/api/project/all';
    console.log(url);
    this.restApiService.getRequest(url)
      .map(res => res.json().data)
      .subscribe(
        (value: Project) => {
          console.log(value);
          this.newProject = value;
        },
        (err: any) => {
          console.error(err);
        }
      );

  }

  postProject() {
    // console.log("Entered post material")
    const url = 'http://49.50.76.29:8090/api/project/new';
    // console.log(this.newMaterial);
    this.restApiService.postRequest(url, this.newProject)
      .map(res => res.json().data[0])
      .subscribe(
        (value: Project) => {
          this.newProject = value;
          // console.log(this.newMaterial);
          this.newProject = new Project;
          this.selectPage(this.activePage);
          console.log(this.newProject);
        },
        (err: any) => {
          console.error(err);
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

  getProject(n) {
    // console.log('Entered get materials')
    // console.log(n)
    this.lastSearchObj = {'from': 'start', '1': n};

    let url = 'http://49.50.76.29:8090/api/project/search?search=&filter[]=name&filter[]=start_date&filter[]=end_date&perPage=' +
      String(this.perPageCount) + '&page=' + String(n);

    this.searchLoad.next(url);

    url = 'http://49.50.76.29:8090/api/project/search?search=&filter[]=name&filter[]=start_date&filter[]=end_date&perPage=' +
      String(1) + '&page=' + String(0);

    this.searchTotal.next(url);
  }

  selectPage(p) {
    // console.log('Entered select page')
    // console.log(p)
    // console.log(this.lastSearchObj['from'])
    this.activePage = p;
    switch (this.lastSearchObj['from']) {
      case 'full':
        this.generalFilter(this.lastSearchObj['1'], p);
        break;

      case 'ind':
        this.individualFilter(this.lastSearchObj['1'], this.lastSearchObj['2'], p)
        break;

      case 'start':
        this.getProject(p)
        break;

      default:
        // code...
        break;
    }
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

    this.searchTotal.next(url)

  }

}
