/**
 * Created by DELL on 6/6/2017.
 */
import {Material} from './material.model';
import {Labour} from './labour.model';

export class LineItem {
  id: number;
  boq_id: number ;
  description: string;
  title: string;
  unit: string;
  quantity: number;
  rate: number;
  amount: number;
  wastage?: number;
  drawing_reference: string;
  length: number;
  breadth: number;
  thickness: number;
  materials?:Material[]=[];
  labours?:Labour[]=[];
}
