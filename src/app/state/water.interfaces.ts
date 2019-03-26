import { MaltType } from '../water/models/malt-type.enum';

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
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType,
      crystalPh: number,
    },
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType,
      crystalPh: number,
    },
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType,
      crystalPh: number,
    },
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType,
      crystalPh: number,
    },
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType,
      crystalPh: number,
    },
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType,
      crystalPh: number,
    },
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType,
      crystalPh: number,
    },
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType,
      crystalPh: number,
    }
    ];
  mashThickness: number;
  totalGrainWeight: number;
}

export interface GrainType {
  id: number;
  name: string;
  pH: number;
  maltType: MaltType;
}

export interface Grain {
  grainPosition: number;
  name: string;
  weight: number;
  color: number;
  grainType: GrainType;
  crystalPh: number;
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
  ratio: number;
}

export interface BeerStyle {
  id: number;
  bjcpStyleId: string;
  name: string;
  calciumRange: string;
  magnesiumRange: string;
  sodiumRange: string;
  chlorideRange: string;
  sulfateRange: string;
  alkalinityRange: string;
  residualAlkalinityRange: string;
  color: string;
}
