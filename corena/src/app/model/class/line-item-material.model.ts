/**
 * Created by DELL on 6/6/2017.
 */
// export class LineItemMaterial {
//   public id: number;
//   public lineItem_id: number;
//   public  material_id: number;
// }
export class MaterialRateAnalysis {
  public id: number;
  public lineItem_id: number;
  public  material_id: number;
  length: number;
  breadth: number;
  thickness: number;
  uom: string;
  rate: number;
  amount: number;
  wastage: number;
}