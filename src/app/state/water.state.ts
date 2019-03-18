import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddGrainBill,
  AddWaterAdjustment,
  AddWaterReport,
  CalculateSpargeBakingSodaAddition,
  CalculateSpargeCalciumChlorideAddition, CalculateSpargeChalkAddition,
  CalculateSpargeEpsomSaltAddition,
  CalculateSpargeGypsumAddition,
  CalculateSpargeSlakedLimeAddition,
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
    ],
    mashThickness: 0,
    totalGrainWeight: 0
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
      gypsum: 0,
      showGypsum: false,
      showCalciumChloride: false,
      showEpsomSalt: false
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
      chalk: 0,
      showSlakedLime: false,
      showBakingSoda: false,
      showChalk: false
    }
  },
  adjustmentSummary: {
    mashWater: {
      calcium: 0,
      sodium: 0,
      magnesium: 0,
      chloride: 0,
      sulfate: 0,
      ratio: 0
    },
    overallWater: {
      calcium: 0,
      sodium: 0,
      magnesium: 0,
      chloride: 0,
      sulfate: 0,
      ratio: 0
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
    ctx.setState({
      ...state,
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
    const totalGrainWeight = state.grainBill.grains
      .filter(grain => grain.weight)
      .reduce((acc, grain) => acc + grain.weight, 0);
    ctx.setState({
      ...state,
      waterReport: action.waterReport,
      grainBill: {
        grains: state.grainBill.grains,
        totalGrainWeight: state.grainBill.totalGrainWeight,
        mashThickness: action.waterReport.mashVolume / (totalGrainWeight !== 0 ? totalGrainWeight : 1)
      }
    });
  }

  @Action(AddGrainBill)
  addGrainBill(ctx: StateContext<WaterStateModel>, action: AddGrainBill) {
    const state = ctx.getState();
    const totalGrainWeight = action.grainBill.grains
      .filter(grain => grain.weight)
      .reduce((acc, grain) => acc + grain.weight, 0);
    ctx.setState({
      ...state,
      grainBill: {
        grains: action.grainBill.grains,
        totalGrainWeight: totalGrainWeight,
        mashThickness: state.waterReport.mashVolume / (totalGrainWeight !== 0 ? totalGrainWeight : 1)
      }
    });
  }

  @Action(AddWaterAdjustment)
  addWaterAdjustment(ctx: StateContext<WaterStateModel>, action: AddWaterAdjustment) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      waterAdjustment: action.waterAdjustment
    });
  }

  @Action(SetMashPh)
  setMashPh(ctx: StateContext<WaterStateModel>, action: SetMashPh) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      mashPh: action.mashPh
    });
  }

  @Action(SetAdjustmentSummary)
  setAdjustmentSummary(ctx: StateContext<WaterStateModel>, action: SetAdjustmentSummary) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      adjustmentSummary: action.adjustmentSummary
    });
  }

  @Action(CalculateSpargeGypsumAddition)
  calculateSpargeAddition(ctx: StateContext<WaterStateModel>, action: CalculateSpargeGypsumAddition) {
    const state = ctx.getState();
    const mashVolume = state.waterReport.mashVolume;
    const spargeVolume = state.waterReport.spargeVolume;
    ctx.setState({
      ...state,
      waterAdjustment: {
        ...state.waterAdjustment,
        decreasePhSaltsMash: {
          ...state.waterAdjustment.decreasePhSaltsMash,
          gypsum: action.gypsum
        },
        decreasePhSaltsSparge: {
          ...state.waterAdjustment.decreasePhSaltsSparge,
          gypsum: action.showGypsum ? action.gypsum / mashVolume * spargeVolume : 0,
          showGypsum: action.showGypsum
        }
      }
    });
  }

  @Action(CalculateSpargeCalciumChlorideAddition)
  calculateSpargeCalciumChlorideAddition(ctx: StateContext<WaterStateModel>, action: CalculateSpargeCalciumChlorideAddition) {
    const state = ctx.getState();
    const mashVolume = state.waterReport.mashVolume;
    const spargeVolume = state.waterReport.spargeVolume;
    ctx.setState({
      ...state,
      waterAdjustment: {
        ...state.waterAdjustment,
        decreasePhSaltsMash: {
          ...state.waterAdjustment.decreasePhSaltsMash,
          calciumChloride: action.calciumChloride
        },
        decreasePhSaltsSparge: {
          ...state.waterAdjustment.decreasePhSaltsSparge,
          calciumChloride: action.showCalciumChloride ? action.calciumChloride / mashVolume * spargeVolume : 0,
          showCalciumChloride: action.showCalciumChloride
        }
      }
    });
  }

  @Action(CalculateSpargeEpsomSaltAddition)
  calculateSpargeEpsomSaltAddition(ctx: StateContext<WaterStateModel>, action: CalculateSpargeEpsomSaltAddition) {
    const state = ctx.getState();
    const mashVolume = state.waterReport.mashVolume;
    const spargeVolume = state.waterReport.spargeVolume;
    ctx.setState({
      ...state,
      waterAdjustment: {
        ...state.waterAdjustment,
        decreasePhSaltsMash: {
          ...state.waterAdjustment.decreasePhSaltsMash,
          epsomSalt: action.epsomSalt
        },
        decreasePhSaltsSparge: {
          ...state.waterAdjustment.decreasePhSaltsSparge,
          epsomSalt: action.showEpsomSalt ? action.epsomSalt / mashVolume * spargeVolume : 0,
          showEpsomSalt: action.showEpsomSalt
        }
      }
    });
  }

  @Action(CalculateSpargeSlakedLimeAddition)
  calculateSpargeSlakedLimeAddition(ctx: StateContext<WaterStateModel>, action: CalculateSpargeSlakedLimeAddition) {
    const state = ctx.getState();
    const mashVolume = state.waterReport.mashVolume;
    const spargeVolume = state.waterReport.spargeVolume;
    ctx.setState({
      ...state,
      waterAdjustment: {
        ...state.waterAdjustment,
        increasePhSaltsMash: {
          ...state.waterAdjustment.increasePhSaltsMash,
          slakedLime: action.slakedLime
        },
        increasePhSaltsSparge: {
          ...state.waterAdjustment.increasePhSaltsSparge,
          slakedLime: action.showSlakedLime ? action.slakedLime / mashVolume * spargeVolume : 0,
          showSlakedLime: action.showSlakedLime
        }
      }
    });
  }

  @Action(CalculateSpargeBakingSodaAddition)
  calculateSpargeBakingSodaAddition(ctx: StateContext<WaterStateModel>, action: CalculateSpargeBakingSodaAddition) {
    const state = ctx.getState();
    const mashVolume = state.waterReport.mashVolume;
    const spargeVolume = state.waterReport.spargeVolume;
    ctx.setState({
      ...state,
      waterAdjustment: {
        ...state.waterAdjustment,
        increasePhSaltsMash: {
          ...state.waterAdjustment.increasePhSaltsMash,
          bakingSoda: action.bakingSoda
        },
        increasePhSaltsSparge: {
          ...state.waterAdjustment.increasePhSaltsSparge,
          bakingSoda: action.showBakingSoda ? action.bakingSoda / mashVolume * spargeVolume : 0,
          showBakingSoda: action.showBakingSoda
        }
      }
    });
  }

  @Action(CalculateSpargeChalkAddition)
  calculateSpargeChalkAddition(ctx: StateContext<WaterStateModel>, action: CalculateSpargeChalkAddition) {
    const state = ctx.getState();
    const mashVolume = state.waterReport.mashVolume;
    const spargeVolume = state.waterReport.spargeVolume;
    ctx.setState({
      ...state,
      waterAdjustment: {
        ...state.waterAdjustment,
        increasePhSaltsMash: {
          ...state.waterAdjustment.increasePhSaltsMash,
          chalk: action.chalk
        },
        increasePhSaltsSparge: {
          ...state.waterAdjustment.increasePhSaltsSparge,
          chalk: action.showChalk ? action.chalk / mashVolume * spargeVolume : 0,
          showChalk: action.showChalk
        }
      }
    });
  }
}
