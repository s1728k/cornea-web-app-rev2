import {BOQTable} from './boq-table.model';
/**
 * Created by DELL on 6/5/2017.
 */
export class BoqNameId {
  public name: string;
  public id: number;
  public has_ra: boolean;
  public lineItems: BOQTable[];
}
