import {LineItem} from "./line-item.model";
import {LabourRateAnalysis} from "./labour-rate-analysis.model";
import {MaterialRateAnalysis} from "./line-item-material.model";
export class MainRateAnalysis {
  lineItem_id: number;
  labour_total: number=0;
  material_total: number;
  profit_margin: number;
  overhead_margin: number;
  grand_total: number;
  boq_id: number;
  labourRateAnalysis: LabourRateAnalysis[]=[];
  materialRateAnalysis: MaterialRateAnalysis[]=[];

  constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}