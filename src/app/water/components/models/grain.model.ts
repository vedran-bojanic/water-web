import { GrainDropdown } from './grain-dropdown.model';

export interface Grain {
  id: number;
  name: string;
  weight: number;
  color: number;
  grainDropdown: GrainDropdown;
  crystalPh: number;
}
