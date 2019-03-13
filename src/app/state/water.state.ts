import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddGrainBill,
  AddWaterAdjustment,
  AddWaterReport,
  SetAdjustmentSummary,
  SetMashPh,
  SetWater
} from './water.actions';
import { WaterStateModel } from './water-state.model';

export const getWaterInitState = (): WaterStateModel => ({
  waterId: 0,
  waterReport: {
    calcium: 0,
    magnesium: 0,
    sodium: 0,
    chloride: 0,
    sulfate: 0,
    alkalinity: 0,
    mashVolume: 0,
    spargeVolume: 0,
    mashRoPercentage: 0,
    spargeRoPercentage: 0
  },
  grainBill: {
    grains: [
      {
        id: 1,
        name: '',
        weight: 0,
        color: 0,
        grainDropdown: null,
        crystalPh: 0
      },
      {
        id: 2,
        name: '',
        weight: 0,
        color: 0,
        grainDropdown: null,
        crystalPh: 0
      },
      {
        id: 3,
        name: '',
        weight: 0,
        color: 0,
        grainDropdown: null,
        crystalPh: 0
      },
      {
        id: 4,
        name: '',
        weight: 0,
        color: 0,
        grainDropdown: null,
        crystalPh: 0
      },
      {
        id: 5,
        name: '',
        weight: 0,
        color: 0,
        grainDropdown: null,
        crystalPh: 0
      },
      {
        id: 6,
        name: '',
        weight: 0,
        color: 0,
        grainDropdown: null,
        crystalPh: 0
      },
      {
        id: 7,
        name: '',
        weight: 0,
        color: 0,
        grainDropdown: null,
        crystalPh: 0
      },
      {
        id: 8,
        name: '',
        weight: 0,
        color: 0,
        grainDropdown: null,
        crystalPh: 0
      }
    ]
  },
  waterAdjustment: {
    decreasePhSaltsMash: {
      epsomSalt: 0,
      calciumChloride: 0,
      gypsum: 0
    },
    decreasePhSaltsSparge: {
      epsomSalt: 0,
      calciumChloride: 0,
      gypsum: 0
    },
    decreasePhAcid: {
      lacticAcid: 0,
      acidulatedMalt: 0
    },
    increasePhSaltsMash: {
      slakedLime: 0,
      bakingSoda: 0,
      chalk: 0
    },
    increasePhSaltsSparge: {
      slakedLime: 0,
      bakingSoda: 0,
      chalk: 0
    }
  },
  adjustmentSummary: {
    mashWater: {
      calcium: 0,
      sodium: 0,
      magnesium: 0,
      chloride: 0,
      sulfate: 0,
      chlorideToSulfateRatio: 0
    },
    mashSpargeWater: {
      calcium: 0,
      sodium: 0,
      magnesium: 0,
      chloride: 0,
      sulfate: 0,
      chlorideToSulfateRatio: 0
    }
  },
  mashPh: {
    residualAlkalinity: 0,
    effectiveAlkalinity: 0,
    pH: 0
  }
});

@State<WaterStateModel>({
  name: 'water',
  defaults: getWaterInitState()
})
export class WaterState {

  constructor() { }

  @Selector()
  static getWaterStateModel(state: WaterStateModel) {
    return state;
  }

  @Action(SetWater)
  addWater(ctx: StateContext<WaterStateModel>, action: SetWater) {
    const state = ctx.getState();
    ctx.patchState({
      waterId: action.waterStateModel.waterId,
      waterReport: action.waterStateModel.waterReport,
      grainBill: action.waterStateModel.grainBill,
      waterAdjustment: action.waterStateModel.waterAdjustment,
      adjustmentSummary: action.waterStateModel.adjustmentSummary,
      mashPh: action.waterStateModel.mashPh
    });
  }

  @Action(AddWaterReport)
  addWaterReport(ctx: StateContext<WaterStateModel>, action: AddWaterReport) {
    const state = ctx.getState();
    ctx.patchState({
      waterReport: action.waterReport
    });
  }

  @Action(AddGrainBill)
  addGrainBill(ctx: StateContext<WaterStateModel>, action: AddGrainBill) {
    const state = ctx.getState();
    ctx.patchState({
      grainBill: action.grainBill
    });
  }

  @Action(AddWaterAdjustment)
  addWaterAdjustment(ctx: StateContext<WaterStateModel>, action: AddWaterAdjustment) {
    const state = ctx.getState();
    ctx.patchState({
      waterAdjustment: action.waterAdjustment
    });
  }

  @Action(SetMashPh)
  setMashPh(ctx: StateContext<WaterStateModel>, action: SetMashPh) {
    const state = ctx.getState();
    ctx.patchState({
      mashPh: action.mashPh
    });
  }

  @Action(SetAdjustmentSummary)
  setAdjustmentSummary(ctx: StateContext<WaterStateModel>, action: SetAdjustmentSummary) {
    const state = ctx.getState();
    ctx.patchState({
      adjustmentSummary: action.adjustmentSummary
    });
  }
}
