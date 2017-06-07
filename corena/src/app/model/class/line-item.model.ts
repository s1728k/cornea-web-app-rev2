import {NameId} from './name.id.model';
/**
 * Created by DELL on 6/6/2017.
 */
export class LineItem {
  public id: number;
  public boq_id: number;
  public description: string;
  public unit: string;
  public quantity: number;
  public rate: number;
  public amount: number;
  public drawing_reference: string;
  public length: number;
  public breadth: number;
  public thickness: number;
  public material_id: NameId[];
}
