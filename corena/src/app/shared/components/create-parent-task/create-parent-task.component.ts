import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {BOQTable} from '../../../model/class/boq-table.model';
import {Subject} from 'rxjs/Subject';
import {ProjectResponseBOQUpload} from '../../../model/class/project-response';
import {Task} from '../../../model/class/task.model';
import {RestApiService} from '../../../services/rest-api-service.service';
import {NameId} from '../../../model/class/id-n-name.model';

@Component({
  selector: 'app-create-parent-task',
  templateUrl: './create-parent-task.component.html',
  styleUrls: ['./create-parent-task.component.css']
})
export class CreateParentTaskComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
