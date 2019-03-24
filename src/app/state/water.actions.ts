import { BeerStyle, GrainBill, WaterAdjustment, WaterReport } from './water.interfaces';

export class AddWaterReport {
  static readonly type = '[Water] AddWaterReport';
  constructor(public waterReport: WaterReport) { }
}

export class AddGrainBill {
  static readonly type = '[Water] AddGrainBill';
  constructor(public grainBill: GrainBill) { }
}

export class AddWaterAdjustment {
  public static readonly type = '[Water] AddWaterAdjustment';
  constructor(public waterAdjustment: WaterAdjustment) { }
}

export class AddBeerStyle {
  public static readonly type = '[Water] AddBeerStyle';
  constructor(public beerStyle: BeerStyle) { }
}

export class AddWaterName {
  public static readonly type = '[Water] AddWaterName';
  constructor(public name: string) { }
}
