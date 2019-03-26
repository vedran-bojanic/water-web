import { GrainType } from '../../state/water.interfaces';

export interface WaterModel {
  id: number;
  name: string;
  beerStyleId: number;
  waterReport: {
    calcium: number,
    magnesium: number,
    sodium: number,
    chloride: number,
    sulfate: number,
    alkalinity: number,
    mashVolume: number,
    spargeVolume: number,
    mashRoPercentage: number,
    spargeRoPercentage: number
  };
  grains: [
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType
      crystalPh: number
    },
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType
      crystalPh: number
    },
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType
      crystalPh: number
    },
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType
      crystalPh: number
    },
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType
      crystalPh: number
    },
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType
      crystalPh: number
    },
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType
      crystalPh: number
    },
    {
      grainPosition: number,
      name: string,
      weight: number,
      color: number,
      grainTypeId: number,
      grainType: GrainType
      crystalPh: number
    }
  ];
  waterAdjustment: {
    decreasePhSaltsMash: {
      epsomSalt: number,
      calciumChloride: number,
      gypsum: number,
      showGypsum: boolean,
      showCalciumChloride: boolean,
      showEpsomSalt: boolean
    },
    decreasePhSaltsSparge: {
      epsomSalt: number,
      calciumChloride: number,
      gypsum: number,
      showGypsum: boolean,
      showCalciumChloride: boolean,
      showEpsomSalt: boolean
    },
    decreasePhAcid: {
      lacticAcid: number,
      acidulatedMalt: number
    },
    increasePhSaltsMash: {
      slakedLime: number,
      bakingSoda: number,
      chalk: number,
      showSlakedLime: boolean,
      showBakingSoda: boolean,
      showChalk: boolean
    },
    increasePhSaltsSparge: {
      slakedLime: number,
      bakingSoda: number,
      chalk: number,
      showSlakedLime: boolean,
      showBakingSoda: boolean,
      showChalk: boolean
    }
  };
  adjustmentSummary: {
    mashWater: {
      calcium: number,
      sodium: number,
      magnesium: number,
      chloride: number,
      sulfate: number,
      ratio: number
    },
    overallWater: {
      calcium: number,
      sodium: number,
      magnesium: number,
      chloride: number,
      sulfate: number,
      ratio: number
    }
  };
  beerStyle: {
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
  };
}
