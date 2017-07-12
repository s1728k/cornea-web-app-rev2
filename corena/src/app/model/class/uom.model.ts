/**
 * Created by Sunil Kumar T on 7/11/2017.
 */
export class UOM {
  unit: string;
  offset: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class UOMList {
  uom: UOM[]=[];
}

export class UOM1 {
  id: number;
  name: string;
  acr: string;
  offset: number;
  utc?: UOM1[]=[];
}
