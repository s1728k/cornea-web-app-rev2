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
  start: string;
  end: string;p
  percent_complete: number;
  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
