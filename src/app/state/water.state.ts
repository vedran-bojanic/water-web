import { Action, State, StateContext } from '@ngxs/store';
import { WaterStateModel } from './water.interfaces';
import { SetWater } from './water.actions';

@State<WaterStateModel>({
  name: 'water',
  defaults: {
    water: []
  }
})
export class WaterState {

  @Action(SetWater)
  addWater(ctx: StateContext<WaterStateModel>, action: SetWater) {
    const state = ctx.getState();
    ctx.patchState({
      water: [
        ...state.water,
        action.water
      ]
    });
  }
}
