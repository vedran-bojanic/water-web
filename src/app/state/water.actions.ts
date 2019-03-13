import { AdjustmentSummary, GrainBill, MashPh, WaterAdjustment, WaterReport } from './water.interfaces';
import { WaterStateModel } from './water-state.model';


export class SetWater {
    public static readonly type = '[ Water ] SetWater';
    constructor(public waterStateModel: WaterStateModel) { }
}

export class AddWaterReport {
  static readonly type = '[ Water WaterReport ] AddWaterReport';
  constructor(public waterReport: WaterReport) { }
}

export class AddWaterAdjustment {
  public static readonly type = '[Water WaterAdjustment] AddWaterAdjustment';
  constructor(public waterAdjustment: WaterAdjustment) { }
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
