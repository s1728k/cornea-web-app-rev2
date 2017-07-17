/**
 * Created by Sunil Kumar T on 7/12/2017.
 */
export class Task {
  id: number;
  description: string;
  project_id: number;
  parent_task_id: number;
  name: string;
  resource: string;
  start: Date;
  end: Date;
  percent_complete: number;
  childTask: Task[]=[];
  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
