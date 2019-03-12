import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GrainBill } from '../../../../state/water.interfaces';

export class AddGrainBill {
  static readonly type = '[Water Grains] AddGrainBill';
  constructor(public grainBill: GrainBill) { }
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
    return state;
  }

  @Action(AddGrainBill)
  addGrainBill(ctx: StateContext<GrainBill>, action: AddGrainBill) {
    const state = ctx.getState();
    ctx.patchState({
      grains: action.grainBill.grains
    });
  }
}
