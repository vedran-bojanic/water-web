import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddGrainBill,
  AddWaterAdjustment,
  AddWaterReport,
  CalculateSpargeBakingSodaAddition,
  CalculateSpargeCalciumChlorideAddition,
  CalculateSpargeChalkAddition,
  CalculateSpargeEpsomSaltAddition,
  CalculateSpargeGypsumAddition,
  CalculateSpargeSlakedLimeAddition,
  SetAdjustmentSummary,
  SetMashPh
} from './water.actions';
import { WaterStateModel } from './water-state.model';
import { AdjustmentSummary, GrainBill, MashPh, WaterAdjustment, WaterReport } from './water.interfaces';

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
      gypsum: 0,
      showGypsum: false,
      showCalciumChloride: false,
      showEpsomSalt: false
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
      chalk: 0,
      showSlakedLime: false,
      showBakingSoda: false,
      showChalk: false
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

  constructor() {
  }

  @Selector()
  static getWaterStateModel(state: WaterStateModel) {
    return state;
  }

  @Action(AddWaterReport)
  addWaterReport(ctx: StateContext<WaterStateModel>, action: AddWaterReport) {
    const state = ctx.getState();
    const effectiveAlkalinity = this.effectiveAlkalinity(action.waterReport, state.waterAdjustment);
    const residualAlkalinity = this.residualAlkalinity(effectiveAlkalinity, state.adjustmentSummary);
    const chloride = this.chlorideMashWater(action.waterReport, state.waterAdjustment);
    const sulfate = this.sulfateMashWater(action.waterReport, state.waterAdjustment);
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
      },
      mashPh: {
        pH: this.mashPh(state.grainBill, action.waterReport, state.mashPh),
        effectiveAlkalinity: effectiveAlkalinity,
        residualAlkalinity: residualAlkalinity,
      },
      adjustmentSummary: {
        ...state.adjustmentSummary,
        mashWater: {
          calcium: this.calciumMashWater(action.waterReport, state.waterAdjustment),
          magnesium: this.magnesiumMashWater(action.waterReport, state.waterAdjustment),
          sodium: this.sodiumMashWater(action.waterReport, state.waterAdjustment),
          chloride: chloride,
          sulfate: sulfate,
          ratio: chloride / sulfate
        },
        overallWater: {
          ...state.adjustmentSummary.overallWater
        }
      }
    });
  }

  @Action(AddGrainBill)
  addGrainBill(ctx: StateContext<WaterStateModel>, action: AddGrainBill) {
    const state = ctx.getState();
    const totalGrainWeight = action.grainBill.grains
      .filter(grain => grain.weight)
      .reduce((acc, grain) => acc + grain.weight, 0);
    action.grainBill.totalGrainWeight = totalGrainWeight;
    ctx.setState({
      ...state,
      grainBill: {
        grains: action.grainBill.grains,
        totalGrainWeight: totalGrainWeight,
        mashThickness: state.waterReport.mashVolume / (totalGrainWeight !== 0 ? totalGrainWeight : 1)
      },
      mashPh: {
        ...state.mashPh,
        pH: this.mashPh(action.grainBill, state.waterReport, state.mashPh)
      }
    });
  }

  @Action(AddWaterAdjustment)
  addWaterAdjustment(ctx: StateContext<WaterStateModel>, action: AddWaterAdjustment) {
    const state = ctx.getState();
    const effectiveAlkalinity = this.effectiveAlkalinity(state.waterReport, action.waterAdjustment);
    const residualAlkalinity = this.residualAlkalinity(effectiveAlkalinity, state.adjustmentSummary);
    const chloride = this.chlorideMashWater(state.waterReport, action.waterAdjustment);
    const sulfate = this.sulfateMashWater(state.waterReport, action.waterAdjustment);
    ctx.setState({
      ...state,
      waterAdjustment: action.waterAdjustment,
      mashPh: {
        ...state.mashPh,
        effectiveAlkalinity: effectiveAlkalinity,
        residualAlkalinity: residualAlkalinity
      },
      adjustmentSummary: {
        ...state.adjustmentSummary,
        mashWater: {
          calcium: this.calciumMashWater(state.waterReport, action.waterAdjustment),
          magnesium: this.magnesiumMashWater(state.waterReport, action.waterAdjustment),
          sodium: this.sodiumMashWater(state.waterReport, action.waterAdjustment),
          chloride: chloride,
          sulfate: sulfate,
          ratio: chloride / sulfate
        }
      }
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

  private effectiveAlkalinity(waterReport: WaterReport, waterAdjustment: WaterAdjustment): number {
    return ((1 - waterReport.mashRoPercentage / 100) * waterReport.alkalinity) +
      ((waterAdjustment.increasePhSaltsMash.chalk * 130 +
        waterAdjustment.increasePhSaltsMash.bakingSoda * 157 -
        176.1 * waterAdjustment.decreasePhAcid.lacticAcid * 0.88 * 2 -
        4160.4 * 0.02 * waterAdjustment.decreasePhAcid.acidulatedMalt * 2.5 +
        waterAdjustment.increasePhSaltsMash.slakedLime * 357) / (waterReport.mashVolume / 3.785412));
  }

  private residualAlkalinity(effectiveAlkalinity: number, adjustmentSummary: AdjustmentSummary): number {
    return effectiveAlkalinity - ((adjustmentSummary.mashWater.calcium / 1.4) + (adjustmentSummary.mashWater.magnesium / 1.7));
  }

  private mashPh(grainBill: GrainBill, waterReport: WaterReport, mashPh: MashPh): number {
    const totalWeightPh = grainBill.grains
      .filter(grain => grain.weight)
      .reduce((acc, grain) => {
        return acc + (grain.weight * (grain.grainDropdown.type === 2
          ? grain.crystalPh
          : grain.grainDropdown.pH));
      }, 0);
    return (totalWeightPh / grainBill.totalGrainWeight) +
      ((0.1085 * (waterReport.mashVolume / 3.785412) / (grainBill.totalGrainWeight * 2.20462) + 0.013) * (mashPh.residualAlkalinity / 50));
  }

  private calciumMashWater(waterReport: WaterReport, waterAdjustment: WaterAdjustment): number {
    return ((1 - waterReport.mashRoPercentage / 100) * waterReport.calcium) +
      ((waterAdjustment.increasePhSaltsMash.chalk * 105.89 +
        waterAdjustment.decreasePhSaltsMash.gypsum * 60 +
        waterAdjustment.decreasePhSaltsMash.calciumChloride * 72 +
        waterAdjustment.increasePhSaltsMash.slakedLime * 143) /
        (waterReport.mashVolume / 3.785412));
  }

  private magnesiumMashWater(waterReport: WaterReport, waterAdjustment: WaterAdjustment) {
    return ((1 - waterReport.mashRoPercentage / 100) * waterReport.magnesium) +
      ((waterAdjustment.decreasePhSaltsMash.epsomSalt * 24.6) /
        (waterReport.mashVolume / 3.785412));
  }

  private sodiumMashWater(waterReport: WaterReport, waterAdjustment: WaterAdjustment) {
    return ((1 - waterReport.mashRoPercentage / 100) * waterReport.sodium) +
      ((waterAdjustment.increasePhSaltsMash.bakingSoda * 72.3) /
        (waterReport.mashVolume / 3.785412));
  }

  private chlorideMashWater(waterReport: WaterReport, waterAdjustment: WaterAdjustment) {
    return ((1 - waterReport.mashRoPercentage / 100) * waterReport.chloride) +
      ((waterAdjustment.decreasePhSaltsMash.calciumChloride * 127.47) /
        (waterReport.mashVolume / 3.785412));
  }

  private sulfateMashWater(waterReport: WaterReport, waterAdjustment: WaterAdjustment) {
    return ((1 - waterReport.mashRoPercentage / 100) * waterReport.sulfate) +
      ((waterAdjustment.decreasePhSaltsMash.gypsum * 147.4 +
        waterAdjustment.decreasePhSaltsMash.epsomSalt * 103) /
        (waterReport.mashVolume / 3.785412));
  }
}
