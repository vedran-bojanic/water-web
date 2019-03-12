import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddGrainBill,
  AddWaterAdjustment,
  AddWaterReport,
  SetAdjustmentSummary,
  SetMashPh,
  SetWater
} from './water.actions';
import {
  AdjustmentSummary,
  GrainBill,
  MashPh,
  Water,
  WaterAdjustment,
  WaterReport
} from './water.interfaces';

export const getWaterInitState = (): Water => ({
  waterId: 0,
  waterReport: null,
  grainBill: null,
  waterAdjustment: null,
  adjustmentSummary: null,
  mashPh: null
});

@State<Water>({
  name: 'water',
  defaults: getWaterInitState()
})
export class WaterState {

  constructor() { }

  @Selector()
  static getWater(state: Water) {
    return state;
  }

  @Selector()
  static getWaterReport(state: WaterReport) {
    return state;
  }

  @Selector()
  static getGrainBill(state: GrainBill) {
    return state;
  }

  @Selector()
  static getWaterAdjustment(state: WaterAdjustment) {
    return state;
  }

  @Selector()
  static getMashPh(state: MashPh) {
    return state;
  }

  @Selector()
  static getAdjustmentSummary(state: AdjustmentSummary) {
    return state;
  }

  @Action(SetWater)
  addWater(ctx: StateContext<Water>, action: SetWater) {
    const state = ctx.getState();
    ctx.patchState({
      waterId: action.water.waterId,
      waterReport: action.water.waterReport,
      grainBill: action.water.grainBill,
      waterAdjustment: action.water.waterAdjustment,
      adjustmentSummary: action.water.adjustmentSummary,
      mashPh: action.water.mashPh
    });
  }

  @Action(AddWaterReport)
  addWaterReport(ctx: StateContext<WaterReport>, action: AddWaterReport) {
    const state = ctx.getState();
    ctx.patchState({
      calcium: action.waterReport.calcium,
      magnesium: action.waterReport.magnesium,
      sodium: action.waterReport.sodium,
      chloride: action.waterReport.chloride,
      sulfate: action.waterReport.sulfate,
      alkalinity: action.waterReport.alkalinity,
      mashVolume: action.waterReport.mashVolume,
      spargeVolume: action.waterReport.spargeVolume,
      mashRoPercentage: action.waterReport.mashRoPercentage,
      spargeRoPercentage: action.waterReport.spargeRoPercentage,
    });
  }

  @Action(AddGrainBill)
  addGrainBill(ctx: StateContext<GrainBill>, action: AddGrainBill) {
    const state = ctx.getState();
    ctx.patchState({
      grains: action.grainBill.grains
    });
  }

  @Action(AddWaterAdjustment)
  addWaterAdjustment(ctx: StateContext<WaterAdjustment>, action: AddWaterAdjustment) {
    const state = ctx.getState();
    ctx.patchState({
      decreasePhSaltsMash: action.waterAdjustment.decreasePhSaltsMash,
      decreasePhSaltsSparge: action.waterAdjustment.decreasePhSaltsSparge,
      decreasePhAcid: action.waterAdjustment.decreasePhAcid,
      increasePhSaltsMash: action.waterAdjustment.increasePhSaltsMash,
      increasePhSaltsSparge: action.waterAdjustment.increasePhSaltsSparge
    });
  }

  @Action(SetMashPh)
  setMashPh(ctx: StateContext<MashPh>, action: SetMashPh) {
    const state = ctx.getState();
    ctx.patchState({
      effectiveAlkalinity: action.mashPh.effectiveAlkalinity,
      residualAlkalinity: action.mashPh.residualAlkalinity,
      pH: action.mashPh.pH
    });
  }

  @Action(SetAdjustmentSummary)
  setAdjustmentSummary(ctx: StateContext<AdjustmentSummary>, action: SetAdjustmentSummary) {
    const state = ctx.getState();
    ctx.patchState({
      mashWater: action.adjustmentSummary.mashWater,
      mashSpargeWater: action.adjustmentSummary.mashSpargeWater
    });
  }
}
