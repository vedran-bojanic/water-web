import { GrainType } from '../water/models/grain-type.enum';

export interface WaterReport {
  calcium: number;
  magnesium: number;
  sodium: number;
  chloride: number;
  sulfate: number;
  alkalinity: number;
  mashVolume: number;
  spargeVolume: number;
  mashRoPercentage: number;
  spargeRoPercentage: number;
}

export interface GrainBill {
  grains: [
    {
      id: number,
      name: string,
      weight: number,
      color: number,
      grainDropdown: GrainDropdown,
      crystalPh: number,
    },
    {
      id: number,
      name: string,
      weight: number,
      color: number,
      grainDropdown: GrainDropdown,
      crystalPh: number,
    },
    {
      id: number,
      name: string,
      weight: number,
      color: number,
      grainDropdown: GrainDropdown,
      crystalPh: number,
    },
    {
      id: number,
      name: string,
      weight: number,
      color: number,
      grainDropdown: GrainDropdown,
      crystalPh: number,
    },
    {
      id: number,
      name: string,
      weight: number,
      color: number,
      grainDropdown: GrainDropdown,
      crystalPh: number,
    },
    {
      id: number,
      name: string,
      weight: number,
      color: number,
      grainDropdown: GrainDropdown,
      crystalPh: number,
    },
    {
      id: number,
      name: string,
      weight: number,
      color: number,
      grainDropdown: GrainDropdown,
      crystalPh: number,
    },
    {
      id: number,
      name: string,
      weight: number,
      color: number,
      grainDropdown: GrainDropdown,
      crystalPh: number,
    }
    ];
  mashThickness: number;
  totalGrainWeight: number;
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
  decreasePhSaltsMash: DecreasePh;
  decreasePhSaltsSparge: DecreasePh;
  decreasePhAcid: AcidMalt;
  increasePhSaltsMash: IncreasePh;
  increasePhSaltsSparge: IncreasePh;
}

export interface DecreasePh {
  gypsum: number;
  calciumChloride: number;
  epsomSalt: number;
  showGypsum: boolean;
  showCalciumChloride: boolean;
  showEpsomSalt: boolean;
}

export interface AcidMalt {
  acidulatedMalt: number;
  lacticAcid: number;
}

export interface IncreasePh {
  slakedLime: number;
  bakingSoda: number;
  chalk: number;
  showSlakedLime: boolean;
  showBakingSoda: boolean;
  showChalk: boolean;
}

export interface MashPh {
  effectiveAlkalinity: number;
  residualAlkalinity: number;
  pH: number;
}

export interface AdjustmentSummary {
  mashWater: Water;
  overallWater: Water;
}

export interface Water {
  calcium: number;
  magnesium: number;
  sodium: number;
  chloride: number;
  sulfate: number;
  chlorideToSulfateRatio: number;
}
