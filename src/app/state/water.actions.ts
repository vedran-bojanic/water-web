import { GrainBill, WaterAdjustment, WaterReport } from './water.interfaces';

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
