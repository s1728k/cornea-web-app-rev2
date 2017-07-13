import { Component, OnInit, OnChanges, Input } from '@angular/core';
import {RestApiService} from '../services/rest-api-service.service';

// Models Imported
import {ProjectResponseBOQUpload} from '../model/class/project-response';
import {BOQTable} from '../model/class/boq-table.model';
import { Task } from '../model/class/task.model';
import { NameId } from '../model/class/id-n-name.model';

// ------------http imports-------------------------------
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import * as Constants from "../shared/constants.globals";

@Component({
  selector: 'app-taskmanagement',
  templateUrl: './taskmanagement.component.html',
  styleUrls: ['./taskmanagement.component.css']
})

export class TaskmanagementComponent implements OnInit, OnChanges {

  projectsSuggesions: Observable<ProjectResponseBOQUpload[]>;
  projectsSuggesionsLoad:Subject<string> = new Subject<string>(); // subject used to monitor projectsSuggesions observable

  boqsSuggesions: Observable<BOQTable[]>;
  boqsSuggesionsLoad:Subject<string> = new Subject<string>(); // subject used to monitor projectsSuggesions observable

  lineItemsSuggesions: Observable<BOQTable[]>;
  lineItemsSuggesionsLoad:Subject<string> = new Subject<string>(); // subject used to monitor projectsSuggesions observable

  newTask: Task = new Task();
  parentTasks: Task[]=[];

  selectedProject: NameId = new NameId();
  selectedBoq: NameId = new NameId();
  selectedLineItem: NameId = new NameId();

  constructor(private restApiService: RestApiService) {

  }

  ngOnInit() {
    this.projectsSuggesions = this.projectsSuggesionsLoad
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => this.restApiService.search(term))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<ProjectResponseBOQUpload[]>([]);
      });

    this.boqsSuggesions = this.boqsSuggesionsLoad
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => this.restApiService.search(term))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<BOQTable[]>([]);
      });

    for (let i=0; i<10; i++){
      this.parentTasks.push(new Task());
    }
    console.log(this.parentTasks.length);
  }

  ngOnChanges() {

  }

  selectedID(type, id){
    switch (type) {
      case "proj":
        this.selectedProject.id=id;
        break;

      case "boq":
        this.selectedBoq.id=id;
        break;

      case "line":
        this.selectedLineItem.id=id;
        break;

      default:
        // code...
        break;
    }
  }

  searchProject(term){
    console.log("Entered searchProject")
    console.log(term)
    let url = 'http://49.50.76.29:8090/api/project/search?visible[]=id&visible[]=name&search='+ term +'&filter[]=name';
    this.projectsSuggesionsLoad.next(url)
  }

  searchBoq(term, proj_id){
    console.log("Entered searchBoq")
    console.log(term)
    let url = 'http://49.50.76.29/api/boq/search?visible[]=id&visible[]=name&conditions[project_id]=' + String(proj_id) +
              '&search='+ term +'&filter[]=name';
    this.boqsSuggesionsLoad.next(url)
  }

  searchLineItems(term, boq_id) {
    console.log("Entered searchLineItems")
    console.log(term)
    let url = 'http://49.50.76.29/api/boq/search?visible[]=id&visible[]=name&conditions[project_id]=' + String(boq_id) +
      '&search='+ term +'&filter[]=name';
    this.boqsSuggesionsLoad.next(url)
    this.selectedBoq=boq_id;
  }

}
