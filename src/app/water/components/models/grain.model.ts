import { GrainType } from '../../models/grain-type.enum';

export interface Grain {
  id: number;
  name: string;
  weight: number;
  color: number;
  pH: number;
  grainTypeId: number;
  grainType: GrainType;
}
