import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MashPh } from '../../../../state/water.interfaces';

export class SetMashPh {
  static readonly type = '[ Water MashPh ] SetMashPh';
  constructor(public mashPh: MashPh | null) {
  }
}

@State<MashPh>({
  name: 'mashPh',
  defaults: {
    effectiveAlkalinity: 0,
    residualAlkalinity: 0,
    pH: 0
  }
})
export class MashPhState {

  @Selector()
  static getMashPh(state: MashPh) {
    return state;
  }

  @Action(SetMashPh)
  setMashPh(ctx: StateContext<MashPh>, action: SetMashPh) {
    const state = ctx.getState();
    ctx.patchState({
      effectiveAlkalinity: action.mashPh.effectiveAlkalinity,
      residualAlkalinity: action.mashPh.residualAlkalinity,
      pH: action.mashPh.pH,
    });
  }
}
