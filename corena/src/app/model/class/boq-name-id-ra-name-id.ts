import {GenericNameId} from './generic-name-id';
import {BOQTable} from './boq-table.model';

export class BoqNameIdRANameId {
  public name: string;
  public id: number;
   ra?: GenericNameId[];
   public lineItems: BOQTable[];
}
