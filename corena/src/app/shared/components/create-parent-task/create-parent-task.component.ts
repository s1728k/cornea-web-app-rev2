import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {BOQTable} from '../../../model/class/boq-table.model';
import {ProjectResponseBOQUpload} from '../../../model/class/project-response';
import {Task} from '../../../model/class/task.model';
import {RestApiService} from '../../../services/rest-api-service.service';
import {NameId} from '../../../model/class/id-n-name.model';

// ------------http imports-------------------------------
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-create-parent-task',
  templateUrl: './create-parent-task.component.html',
  styleUrls: ['./create-parent-task.component.css']
})
export class CreateParentTaskComponent implements OnInit {
  lineItemSuggestions: Observable<BOQTable[]>;
  lineItemSuggestionsLoad: Subject<string> = new Subject<string>();
  selectedLineItem: NameId = new NameId();
  newTask: Task = new Task();
  parentTasks: Task[] = [];

  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<CreateParentTaskComponent>, private restApiService: RestApiService) {

  }


  ngOnInit() {

    this.lineItemSuggestions = this.lineItemSuggestionsLoad
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
    }
    console.log(this.parentTasks.length);
  }

  createParentTask() {
    this.parentTasks.push(this.newTask);
    /*const url = 'http://49.50.76.29:8090/api/task/new';
     // console.log(this.newProject);
     this.restApiService.postRequest(url, this.parentTasks)
     .map(res => res.json().data[0])
     .subscribe(
     (value: BOQTable) => {
     this.parentTasks = value;
     },
     (err: any) => {
     console.error(err);
     }
     );
     this.dialogRef.close(true);*/
    this.dialogRef.close(true);
  }

  selectedID(id) {

    this.selectedLineItem.id = id;

  }

  searchBoq(term, boq_id) {
    console.log('Entered searchBoq')
    console.log(term)
    let url = 'http://49.50.76.29/api/lineItem/all?visible[]=id&visible[]=name&conditions[boq_id]=' + String(boq_id) +
      '&search=' + term + '&filter[]=name';
    this.lineItemSuggestionsLoad.next(url);
    console.log(url);
  }


}


