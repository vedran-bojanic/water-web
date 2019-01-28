import { GrainType } from './grain-type.enum';

export class Grain {
  constructor(
    public id: number,
    public name: string,
    public pH: number,
    public type: GrainType
  ) { }
}
