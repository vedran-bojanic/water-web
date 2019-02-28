import { GrainType } from '../models/grain-type.enum';
import { Grain } from '../models/grain';

export const GRAINS_DB: Grain[] = [
  {
    'id': 1,
    'name': 'Pale ale',
    'weight': 5,
    'color': 2.5,
    'pH': 5.70,
    'type': GrainType.BASE
  },
  {
    'id': 2,
    'name': 'Pilsner',
    'weight': 2,
    'color': 2,
    'pH': 5.79,
    'type': GrainType.BASE
  },
  {
    'id': 3,
    'name': 'Munich',
    'weight': 0.5,
    'color': 10,
    'pH': 5.77,
    'type': GrainType.BASE
  },
  {
    'id': 4,
    'name': 'CaraHell',
    'weight': 0.25,
    'color': 15,
    'pH': 5.12,
    'type': GrainType.CRYSTAL
  }
]
