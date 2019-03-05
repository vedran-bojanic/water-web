import { GrainBill } from '../../models/grain-bill.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Grain } from '../../models/grain.model';

export class AddGrainBill {
  static readonly type = '[Grain Bill] AddGrainBill';
  constructor(public grain: Grain) { }
}

@State<GrainBill>({
  name: 'grainBill',
  defaults: {
    grains: []
  }
})
export class GrainBillState {

  @Selector()
  static getGrainBill(state: GrainBill) {
    return state.grains;
  }

  @Action(AddGrainBill)
  addGrainBill(ctx: StateContext<GrainBill>, action: AddGrainBill) {
    const state = ctx.getState();
    ctx.patchState({
      grains: [
        ...state.grains,
        action.grain
      ]
    });
  }
}
