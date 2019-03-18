import { GrainDropdown } from './water.interfaces';

export class WaterStateModel {
  waterId: number;
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
  grainBill: {
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
  };
  waterAdjustment: {
    decreasePhSaltsMash: {
      epsomSalt: number,
      calciumChloride: number,
      gypsum: number
    },
    decreasePhSaltsSparge: {
      epsomSalt: number,
      calciumChloride: number,
      gypsum: number,
      showGypsum: boolean
      showCalciumChloride: boolean;
      showEpsomSalt: boolean;
    },
    decreasePhAcid: {
      lacticAcid: number,
      acidulatedMalt: number
    },
    increasePhSaltsMash: {
      slakedLime: number,
      bakingSoda: number,
      chalk: number
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
  mashPh: {
    residualAlkalinity: number,
    effectiveAlkalinity: number,
    pH: number
  };
}
