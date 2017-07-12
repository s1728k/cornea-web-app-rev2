/**
 * Created by Sunil Kumar T on 7/12/2017.
 */
export class NameId {
  id: number;
  name: string;
  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
