import { GrainBill } from '../water/components/models/grain-bill.model';
import { WaterAdjustment } from '../water/components/models/water-adjustment.model';
import { AdjustmentSummary } from '../water/components/models/adjustment-summary.model';
import { MashPh } from '../water/components/models/mash-ph.model';
import { Action, State, StateContext } from '@ngxs/store';
import { AddWaterReport } from '../water/components/water-report/states/water-report.action';

export interface Water {
  waterId: number;
  waterReport: AddWaterReport;
  grainBill: GrainBill;
  waterAdjustment: WaterAdjustment;
  adjustmentSummary: AdjustmentSummary;
  mashPh: MashPh;
}

export class SetWater {
    public static readonly type = '[ Water ] SetWater';
    constructor(public water: Water) { }
}

export interface WaterStateModel {
  water: Water[];
}

@State<WaterStateModel>({
  name: 'water',
  defaults: {
    water: []
  }
})
export class WaterState {
  @Action(SetWater)
  matchElevation(ctx: StateContext<WaterStateModel>, action: SetWater) {
    const state = ctx.getState();
    ctx.patchState({
      water: [
        ...state.water,
        action.water
      ]
    });
  }
}
