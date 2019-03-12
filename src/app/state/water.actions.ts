import { AdjustmentSummary, GrainBill, MashPh, Water, WaterAdjustment, WaterReport } from './water.interfaces';


export class SetWater {
    public static readonly type = '[ Water ] SetWater';
    constructor(public water: Water) { }
}

export class AddWaterReport {
  static readonly type = '[ Water WaterReport ] AddWaterReport';
  constructor(public waterReport: WaterReport | null) {
  }
}

export class AddWaterAdjustment {
  public static readonly type = '[Water WaterAdjustment] AddWaterAdjustment';
  constructor(public waterAdjustment: WaterAdjustment | null) { }
}

export class AddGrainBill {
  static readonly type = '[Water Grains] AddGrainBill';
  constructor(public grainBill: GrainBill) { }
}

export class SetMashPh {
  static readonly type = '[ Water MashPh ] SetMashPh';
  constructor(public mashPh: MashPh) { }
}

export class SetAdjustmentSummary {
  static readonly type = '[ Water AdjustmentSummary ] SetAdjustmentSummary';
  constructor(public adjustmentSummary: AdjustmentSummary) { }
}
