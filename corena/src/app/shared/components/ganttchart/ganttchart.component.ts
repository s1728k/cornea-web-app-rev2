import {Component} from '@angular/core';
import {Project, IGanttOptions, Zooming, Task} from '../../../lib';

@Component({
  selector: 'app-ganttchart',
  templateUrl: './ganttchart.component.html',
  styleUrls: ['./ganttchart.component.css']
})
export class GanttchartComponent {

  // Default options
  options: IGanttOptions = {
    scale: {
      start: new Date(2017, 0, 1),
      end: new Date(2017, 1, 1)
    },
    zooming: Zooming[Zooming.days]
  };

  project: Project = {
    'id': '001',
    'name': 'Angular2 Gantt',
    'startDate': new Date('2017-02-27T08:32:09.6972999Z'),
    'tasks': [
      {
        'id': '002',
        'treePath': 'Planning',
        'parentId': 'ea2a8d86-1d4b-4807-844d-d5417fcf618d',
        'name': 'Planning',
        'resource': 'res1',
        'start': new Date('2017-01-01T00:00:00.0Z'),
        'end': new Date('2017-01-03T00:00:00.0Z'),
        'percentComplete': 100,
        'status': 'Completed'
      },
      {
        'id': '003',
        'treePath': 'Research',
        'parentId': 'dd755f20-360a-451f-b200-b83b89a35ad1',
        'name': 'Research',
        'resource': 'res2',
        'start': new Date('2017-01-05T00:00:00.0Z'),
        'end': new Date('2017-01-06T00:00:00.0Z'),
        'percentComplete': 0
      },
      {
        'id': '004',
        'treePath': 'Implementation',
        'parentId': 'j1b997ef-bb89-4ca2-b134-62a08a19aef6',
        'name': 'Implementation',
        'resource': 'res2',
        'start': new Date('2017-01-06T00:00:00.0Z'),
        'end': new Date('2017-01-07T00:00:00.0Z'),
        'percentComplete': 0
      },
      {
        'id': '005',
        'treePath': 'Testing',
        'parentId': 'ub12f674-d5cb-408f-a941-ec76af2ec47e',
        'name': 'Testing',
        'resource': 'res1',
        'start': new Date('2017-01-07T00:00:00.0Z'),
        'end': new Date('2017-01-22T00:00:00.0Z'),
        'percentComplete': 0,
        'status': 'Error'
      },
      {
        'id': '006',
        'treePath': 'Deployment',
        'parentId': 'xafa430b-d4da-4d7d-90ed-69056a042d7a',
        'name': 'Deployment',
        'resource': 'res1',
        'start': new Date('2017-01-22T00:00:00.0Z'),
        'end': new Date('2017-01-23T00:00:00.0Z')
      },
      {
        'id': '007',
        'treePath': 'Delivery',
        'parentId': 'mc9d8d41-1995-4b38-9256-bcc0da171146',
        'name': 'Delivery',
        'resource': 'res2',
        'start': new Date('2017-01-23T00:00:00.0Z'),
        'end': new Date('2017-01-24T00:00:00.0Z')
      }
    ]
  };


  constructor() {

  }

  groupData(array: any[], f: any): any[] {
    const groups = {};
    array.forEach((o: any) => {
      const group = JSON.stringify(f(o));

      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map((group: any) => {
      return groups[group];
    });
  }

  /* This Method is used to create a new task with a id generated,name generated,
   tree path generated and percentage complete generated as 0%
   by default also start date and end date is also generated .
   We can change the fields as it is two way binded.
   */
  createTask(element: any) {
    const selectedStatus = element.options[element.selectedIndex].value;

    const parentTask = {
      'id': 'parent_task_' + Math.random(),
      'parentId': 'parent_task',
      'treePath': 'parent_task',
      'name': 'parent_task',
      'percentComplete': 0,
      'start': new Date('2017-01-01T03:30:00.0Z'),
      'end': new Date('2017-01-01T12:45:00.0Z'),
      'status': selectedStatus
    };
    this.project.tasks.push(parentTask);

    const childTask = {
      'id': 'child_task_' + Math.random(),
      'parentId': 'ea2a8d86-1d4b-4807-844d-d5417fcf618d',
      'treePath': 'parent 1/child3',
      'name': 'child3',
      'percentComplete': 0,
      'start': new Date('2017-01-01T03:30:00.0Z'),
      'end': new Date('2017-01-01T12:45:00.0Z'),
      'status': selectedStatus
    };
    this.project.tasks.push(childTask);

  }

  // When you click this button the task will be updated till 100%.
  updateTasks() {
    for (let i = 0; i < this.project.tasks.length; i++) {
      let task = this.project.tasks[i];

      let progress = setInterval(function () {
        if (task.percentComplete === 100) {
          task.status = 'Completed';
          clearInterval(progress);
        } else {
          if (task.percentComplete === 25) {
            task.status = 'Warning';
          } else if (task.percentComplete === 50) {
            task.status = 'Error';
          } else if (task.percentComplete === 75) {
            task.status = 'Information';
          }

          task.percentComplete += 1;
        }
      }, 200);
    }
  }

  /* This method is used to generate large number of big dataset that will be loaded based on the
   limits set on it.Here it is set upto 1000
   */
  loadBigDataSet() {
    var tasks = [];

    for (var i = 11; i < 1000; i++) {
      var task = {
        id: `parent${i}`,
        name: 'task testing',
        percentComplete: 0,
        start: new Date(),
        end: new Date(),
        status: ''
      };

      tasks.push(task);
    }

    this.project.tasks.push(...tasks);
  }

  gridRowClicked(event) {
    console.log(event);
  }
}
