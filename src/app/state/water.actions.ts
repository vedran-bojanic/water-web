import { AdjustmentSummary, GrainBill, MashPh, WaterAdjustment, WaterReport } from './water.interfaces';
import { WaterStateModel } from './water-state.model';


export class SetWater {
    public static readonly type = '[Water] SetWater';
    constructor(public waterStateModel: WaterStateModel) { }
}

export class AddWaterReport {
  static readonly type = '[Water] AddWaterReport';
  constructor(public waterReport: WaterReport) { }
}

export class AddWaterAdjustment {
  public static readonly type = '[Water] AddWaterAdjustment';
  constructor(public waterAdjustment: WaterAdjustment) { }
}

export class AddGrainBill {
  static readonly type = '[Water] AddGrainBill';
  constructor(public grainBill: GrainBill) { }
}

export class CalculateWeightAndThickness {
  static readonly type = '[Water] CalculateWeightAndThickness';
  constructor(public totalGrainWeight: number) { }
}

export class SetMashPh {
  static readonly type = '[Water] SetMashPh';
  constructor(public mashPh: MashPh) { }
}

export class SetAdjustmentSummary {
  static readonly type = '[Water] SetAdjustmentSummary';
  constructor(public adjustmentSummary: AdjustmentSummary) { }
}
