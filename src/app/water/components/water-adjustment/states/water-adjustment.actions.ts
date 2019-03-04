import { WaterAdjustment } from '../../models/water-adjustment.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export class AddWaterAdjustment {
    public static readonly type = '[Water WaterAdjustment] AddWaterAdjustment';
    constructor(public waterAdjustment: WaterAdjustment | null) { }
}

@State<WaterAdjustment>({
  name: 'waterAdjustment',
  defaults: {
    decreasePhSaltsMash: {
      gypsum: 0,
      calciumChloride: 0,
      epsomSalt: 0
    },
    decreasePhSaltsSparge: {
      gypsum: 0,
      calciumChloride: 0,
      epsomSalt: 0
    },
    decreasePhAcid: {
      acidulatedMalt: 0,
      lacticAcid: 0
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
  }
})
export class WaterAdjustmentState {

  @Selector()
  static getWaterAdjustment(state: WaterAdjustment) {
    return state;
  }

  @Action(AddWaterAdjustment)
  addWaterAdjustment(ctx: StateContext<WaterAdjustment>, action: AddWaterAdjustment) {
    const state = ctx.getState();
    ctx.patchState({
      decreasePhSaltsMash: action.waterAdjustment.decreasePhSaltsMash,
      decreasePhSaltsSparge: action.waterAdjustment.decreasePhSaltsSparge,
      decreasePhAcid: action.waterAdjustment.decreasePhAcid,
      increasePhSaltsMash: action.waterAdjustment.increasePhSaltsMash,
      increasePhSaltsSparge: action.waterAdjustment.increasePhSaltsSparge
    });
  }
}
