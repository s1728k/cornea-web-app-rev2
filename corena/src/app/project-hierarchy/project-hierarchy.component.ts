import {Component, OnInit} from '@angular/core';
import {UserModel} from '../model/UserModel';
import * as Constants from '../shared/Constants';
import {showWarningOnce} from 'tslint/lib/error';

@Component({
  selector: 'app-project-hierarchy',
  templateUrl: './project-hierarchy.component.html',
  styleUrls: ['./project-hierarchy.component.css'],
})
export class ProjectHierarchyComponent implements OnInit {

  user: UserModel;

  execList: UserModel[] = [
    {
      'first_name': 'executive',
      'last_name': '1',
      'id': 1,
      'email': 'executive1@gmail.com',
      'role': 3
    },
    {
      'first_name': 'executive',
      'last_name': '2',
      'id': 2,
      'email': 'executive2@gmail.com',
      'role': 3
    },
    {
      'first_name': 'executive',
      'last_name': '3',
      'id': 3,
      'email': 'executive3@gmail.com',
      'role': 3,
    }
  ];

  superList: UserModel[] = [
    {
      'first_name': 'Sunil Kumar',
      'last_name': 'Thimma Reddy',
      'id': 1,
      'email': 'sunil.kumar@codebakerz.in',
      'role': 2
    },
    {
      'first_name': 'Ronney',
      'last_name': 'Ismail',
      'id': 2,
      'email': 'ronney@codebakerz.in',
      'role': 2
    },
    {
      'first_name': 'Jyothiranjan',
      'last_name': 'mohanty',
      'id': 3,
      'email': 'Jyothiranjan.mohanty@codebakerz.com',
      'role': 2,
    },
    {
      'first_name': 'Soumya',
      'last_name': 'sanchitabhuyan',
      'id': 3,
      'email': 'soumya.sanchitabhuyan@codebakerz.com',
      'role': 2,
    }
  ];

  pmList: UserModel[] = [
    {
      'first_name': 'Arun',
      'last_name': 'Bangar',
      'id': 1,
      'email': 'arun@nomail.com',
      'role': 1
    },
    {
      'first_name': 'DEV',
      'last_name': 'ASHISH',
      'id': 2,
      'email': 'dev@nomail.com',
      'role': 1
    },
    {
      'first_name': 'Rahul',
      'last_name': 'SS',
      'id': 3,
      'email': 'rahul@nomail.com',
      'role': 1,
    }
  ];

  request_pm = Constants.projectManager;
  request_sup = Constants.supervisor;
  request_exec = Constants.executive;
  pm_id = Constants.projectManagerId;
  sup_id = Constants.supervisorId;
  exec_id = Constants.executiveId;

  projectManagerUsers: UserModel[] = [];
  supervisorUsers: UserModel[] = [];
  executives: UserModel[] = [];

  allowDropFunction(roleId: number): any {
    console.log('data returned in param', roleId);
    return (dragData: any) => dragData.role === roleId;
  }

  addItems($event: any) {
    console.log('add itemm in box one', $event.dragData, event);
    switch ($event.dragData.role) {
      case Constants.projectManagerId:
        console.log('roleId', $event.dragData.role);
        this.projectManagerUsers.push($event.dragData);
        break;
      case Constants.supervisorId:
        console.log('roleId', $event.dragData.role);
        this.supervisorUsers.push($event.dragData);
        break;
      case Constants.executiveId:
        console.log('roleId', $event.dragData.role);
        this.executives.push($event.dragData);
        break;
      default:
        this.executives.push($event.dragData);
        break;
    }
  }

  // array: string[] = ['id', 'Manager', 'ToolTip'];
  // pm_name: string = this.projectManagerUsers[0].first_name + ' ' + this.projectManagerUsers[0].last_name;
  // sup_name: string = this.supervisorUsers[0].first_name + ' ' + this.supervisorUsers[0].last_name;
  //
  // pm: string[] = [this.projectManagerUsers[0].first_name + ' ' + this.projectManagerUsers[0].last_name, '', Constants.projectManager];
  // supervisor: string[] = [this.supervisorUsers[0].first_name + ' ' + this.supervisorUsers[0].last_name,
  //   this.projectManagerUsers[0].first_name + ' ' + this.projectManagerUsers[0].last_name, Constants.supervisor];
  //
  // public org_ChartData = this.getChartData();

  getChartData(): any {
    if (this.projectManagerUsers != null) {
      return [
        // this.array,
        // this.pm,
        // this.supervisor
      ];
    } else {
      return [];
    }

  }

  // public org_ChartOptions = {
  //   allowHtml: true
  // };

  constructor() {
    this.user = new UserModel();
  }
  ngOnInit() {
  }

  showProjectTeam(): boolean {
    return this.projectManagerUsers != null;
  }
}
