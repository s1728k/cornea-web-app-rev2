/**
 * Created by DELL on 6/10/2017.
 */
import {Material} from './material.model'
export class SubMaterial {
  id: number;
  name: string;
  rate: number;
  srno: any;
  uom: string;
  type:number;
  cf_price: number;
  item_id:number;
}
export class CFFactor {
  id: number;
  srno:string;
  description: string;
  item_id: number;
  price: number;
  uom: string;
  type: number[];
  cf_price: {};
  material: Material[]=[];
  submaterials: SubMaterial[]=[];
}
