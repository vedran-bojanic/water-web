import { GrainBill } from '../../models/grain-bill.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export class AddGrainBill {
  static readonly type = '[Grain Bill] AddGrainBill';
  constructor(public payload: GrainBill) { }
}

export interface GrainBillModel {
  grainBill: GrainBill[];
}

@State<GrainBillModel>({
  name: 'grainBill',
  defaults: {
    grainBill: []
  }
})
export class GrainBillState {

  @Selector()
  static getGrainBill(state: GrainBillModel) {
    return state.grainBill;
  }

  @Action(AddGrainBill)
  addGrainBill(ctx: StateContext<GrainBillModel>, { payload }: AddGrainBill) {
    const state = ctx.getState();
    ctx.patchState({
      grainBill: [
        ...state.grainBill,
        payload
      ]
    });
  }
}
