import {MainRateAnalysis} from './main-rate-analysis.model';

export class LineItemLabour{
    line_item_id:number;
    master_labour_id:number;
}

export class LineItemMaterial{
    line_item_id:number;
    master_material_id:number;
}

export class GlobalRateAnalysis{
    id:number;
    title:string;
    boq_id:number;
    mainRateAnalysis:MainRateAnalysis[]=[];
    lineItem_material:LineItemMaterial[]=[];
    lineItem_labour:LineItemLabour[]=[];
}
