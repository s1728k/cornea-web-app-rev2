import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {RestApiService} from '../services/rest-api-service.service';

import {MdDialog} from '@angular/material';
import {SubtaskDialogComponent} from '../shared/components/subtask-dialog/subtask-dialog.component';
import {GanttchartDialogComponent} from '../shared/components/ganttchart-dialog/ganttchart-dialog.component';

// Models Imported
import {ProjectResponseBOQUpload} from '../model/class/project-response';
import {BOQTable} from '../model/class/boq-table.model';
import {Task} from '../model/class/task.model';
import {NameId} from '../model/class/id-n-name.model';

// ------------http imports-------------------------------
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import * as Constants from '../shared/constants.globals';
import {CreateParentTaskComponent} from 'app/shared/components/create-parent-task/create-parent-task.component';
import {ShowCompleteTaskDialogComponent} from '../shared/components/show-complete-task-dialog/show-complete-task-dialog.component';
import {ShowSubtaskDialogComponent} from '../shared/components/show-subtask-dialog/show-subtask-dialog.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-taskmanagement',
  templateUrl: './taskmanagement.component.html',
  styleUrls: ['./taskmanagement.component.css']
})

export class TaskmanagementComponent implements OnInit, OnChanges {

  projectsSuggesions: Observable<ProjectResponseBOQUpload[]>;
  projectsSuggesionsLoad: Subject<string> = new Subject<string>(); // subject used to monitor projectsSuggesions observable

  boqsSuggesions: Observable<BOQTable[]>;
  boqsSuggesionsLoad: Subject<string> = new Subject<string>(); // subject used to monitor projectsSuggesions observable

  lineItemsSuggesions: Observable<BOQTable[]>;
  lineItemsSuggesionsLoad: Subject<string> = new Subject<string>(); // subject used to monitor projectsSuggesions observable

  newTask: Task = new Task();
  parentTasks: Task[] = [];

  selectedProject: NameId = new NameId();
  selectedBoq: NameId = new NameId();
  selectedLineItem: NameId = new NameId();

  constructor(private restApiService: RestApiService, private mdDialog: MdDialog, private router: Router) {

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

    for (let i = 0; i < 10; i++) {
      this.parentTasks.push(new Task());
      this.parentTasks[i].id = i + 1;
      this.parentTasks[i].name = 'New Task';
      this.parentTasks[i].description = 'this is the description for the task ' + String(i + 1);
      this.parentTasks[i].start = new Date('February 5, 2005 10:13:00');
      this.parentTasks[i].end = new Date('March 5, 2005 10:13:00');
    }
    console.log(this.parentTasks.length);
  }

  ngOnChanges() {

  }

  selectedID(type, id) {
    switch (type) {
      case 'proj':
        this.selectedProject.id = id;
        break;

      case 'boq':
        this.selectedBoq.id = id;
        break;

      case 'line':
        this.selectedLineItem.id = id;
        break;

      default:
        // code...
        break;
    }
  }

  searchProject(term) {
    console.log('Entered searchProject');
    console.log(term);
    let url = 'http://49.50.76.29:8090/api/project/search?visible[]=id&visible[]=name&search=' + term + '&filter[]=name';
    this.projectsSuggesionsLoad.next(url);
  }

  searchBoq(term, proj_id) {
    console.log('Entered searchBoq');
    console.log(term);
    let url = 'http://49.50.76.29/api/boq/search?visible[]=id&visible[]=name&conditions[project_id]=' + String(proj_id) +
      '&search=' + term + '&filter[]=name';
    this.boqsSuggesionsLoad.next(url);
  }

  searchLineItems(term, boq_id) {
    console.log('Entered searchLineItems');
    console.log(term)
    let url = 'http://49.50.76.29/api/boq/search?visible[]=id&visible[]=name&conditions[project_id]=' + String(boq_id) +
      '&search=' + term + '&filter[]=name';
    this.boqsSuggesionsLoad.next(url)
    this.selectedBoq = boq_id;
  }

  addParentTask() {
    this.mdDialog.open(CreateParentTaskComponent, {disableClose: true, hasBackdrop: true});
  }

  showGanttChart() {
    console.log('entered showGanttChart');
    this.restApiService.projectId = this.selectedProject.id;
    this.restApiService.boqId = this.selectedBoq.id;
    this.router.navigate(['/pages/ganttchart']);
  }

  showParentTask(data: any) {
    this.mdDialog.open(ShowCompleteTaskDialogComponent, {data: data, disableClose: true, hasBackdrop: true});
    // alert('Show Parent Task Popup Shall Come Soon \n task id: ' + task.id);
  }

  createChildTask(task) {
    console.log('entered createChildTask');
    this.mdDialog.open(SubtaskDialogComponent, {disableClose: true, hasBackdrop: true});
  }

  showChildTask(parent_task_id, child_task_id) {
    this.mdDialog.open(ShowSubtaskDialogComponent, {data: child_task_id, disableClose: true, hasBackdrop: true});
    // alert('Show Child Task Popup Shall Come Soon \n Task Id: ' + parent_task_id.id + ' Sub Task Id: ' + child_task_id.id);
  }

}
