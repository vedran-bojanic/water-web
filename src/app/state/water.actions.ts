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

export class AddGrainBill {
  static readonly type = '[Water] AddGrainBill';
  constructor(public grainBill: GrainBill) { }
}

export class AddWaterAdjustment {
  public static readonly type = '[Water] AddWaterAdjustment';
  constructor(public waterAdjustment: WaterAdjustment) { }
}

export class CalculateSpargeGypsumAddition {
  public static readonly type = '[Water] CalculateSpargeGypsumAddition';
  constructor(public gypsum: number, public showGypsum: boolean) { }
}

export class CalculateSpargeCalciumChlorideAddition {
  public static readonly type = '[Water] CalculateSpargeCalciumChlorideAddition';
  constructor(public calciumChloride: number, public showCalciumChloride: boolean) { }
}

export class CalculateSpargeEpsomSaltAddition {
  public static readonly type = '[Water] CalculateSpargeEpsomSaltAddition';
  constructor(public epsomSalt: number, public showEpsomSalt: boolean) { }
}

export class CalculateSpargeSlakedLimeAddition {
  public static readonly type = '[Water] CalculateSpargeSlakedLimeAddition';
  constructor(public slakedLime: number, public showSlakedLime: boolean) { }
}

export class CalculateSpargeBakingSodaAddition {
  public static readonly type = '[Water] CalculateSpargeBakingSodaAddition';
  constructor(public bakingSoda: number, public showBakingSoda: boolean) { }
}

export class CalculateSpargeChalkAddition {
  public static readonly type = '[Water] CalculateSpargeChalkAddition';
  constructor(public chalk: number, public showChalk: boolean) { }
}

export class SetMashPh {
  static readonly type = '[Water] SetMashPh';
  constructor(public mashPh: MashPh) { }
}

export class SetAdjustmentSummary {
  static readonly type = '[Water] SetAdjustmentSummary';
  constructor(public adjustmentSummary: AdjustmentSummary) { }
}
