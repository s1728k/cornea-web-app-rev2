/**
 * Created by DELL on 6/5/2017.
 */
import {Material} from './material.model';
import {Labour} from './labour.model';

export class BOQTable {
  id: number;
  boq_id: number ; // taken from line-item model
  title: string; // taken from line-item model
  sr_no: number;
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  amount: number;
  drawing_reference: string;
  length: number;
  breadth: number;
  thickness: number;
  materials?:Material[]=[];
  labours?:Labour[]=[];
}
