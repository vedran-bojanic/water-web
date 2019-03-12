import { Action, Selector, State, StateContext } from '@ngxs/store';
import { WaterReport } from '../../../../state/water.interfaces';

export class AddWaterReport {
  static readonly type = '[ Water WaterReport ] AddWaterReport';
  constructor(public waterReport: WaterReport | null) {
  }
}

@State<WaterReport>({
  name: 'waterReport',
  defaults: {
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
  }
})
export class WaterReportState {

  @Selector()
  static getWaterReport(state: WaterReport) {
    return state;
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
}
