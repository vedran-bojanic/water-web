import { GrainType } from '../water/models/grain-type.enum';

export interface Water {
  waterId: number;
  waterReport: WaterReport;
  grainBill: GrainBill;
  waterAdjustment: WaterAdjustment;
  adjustmentSummary: AdjustmentSummary;
  mashPh: MashPh;
}

export interface WaterReport {
  calcium: number | null;
  magnesium: number | null;
  sodium: number | null;
  chloride: number | null;
  sulfate: number | null;
  alkalinity: number | null;
  mashVolume: number| null;
  spargeVolume: number| null;
  mashRoPercentage: number| null;
  spargeRoPercentage: number| null;
}

export interface GrainBill {
  grains: Grain[];
}

export interface GrainDropdown {
  id: number;
  name: string;
  pH: number;
  type: GrainType;
}

export interface Grain {
  id: number;
  name: string;
  weight: number;
  color: number;
  grainDropdown: GrainDropdown;
  crystalPh: number;
}

export interface GrainDropdown {
  id: number;
  name: string;
  pH: number;
  type: GrainType;
}

export interface WaterAdjustment {
  decreasePhSaltsMash: DecreasePh | null;
  decreasePhSaltsSparge: DecreasePh | null;
  decreasePhAcid: AcidMalt | null;
  increasePhSaltsMash: IncreasePh | null;
  increasePhSaltsSparge: IncreasePh | null;
}

export interface DecreasePh {
  gypsum: number | null;
  calciumChloride: number | null;
  epsomSalt: number | null;
}

export interface AcidMalt {
  acidulatedMalt: number | null;
  lacticAcid: number | null;
}

export interface IncreasePh {
  slakedLime: number | null;
  bakingSoda: number | null;
  chalk: number | null;
}

export interface MashPh {
  effectiveAlkalinity: number;
  residualAlkalinity: number;
  pH: number;
}

export interface AdjustmentSummary {
  mashWater: MashWater;
  mashSpargeWater: MashSpargeWater;
}

export interface MashWater {
  calcium: number;
  magnesium: number;
  sodium: number;
  chloride: number;
  sulfate: number;
  chlorideToSulfateRatio: number;
}

export interface MashSpargeWater {
  calcium: number;
  magnesium: number;
  sodium: number;
  chloride: number;
  sulfate: number;
  chlorideToSulfateRatio: number;
}
