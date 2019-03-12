import { GrainType } from '../../models/grain-type.enum';

export interface GrainDropdown {
  id: number;
  name: string;
  pH: number;
  type: GrainType;
}
