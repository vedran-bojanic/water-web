import { MaltType } from '../models/malt-type.enum';

export const GRAINS_DB: any[] = [
  {
    'id': 1,
    'name': 'Pale ale',
    'weight': 5,
    'color': 2.5,
    'pH': 5.70,
    'type': MaltType.BASE
  },
  {
    'id': 2,
    'name': 'Pilsner',
    'weight': 2,
    'color': 2,
    'pH': 5.79,
    'type': MaltType.BASE
  },
  {
    'id': 3,
    'name': 'Munich',
    'weight': 0.5,
    'color': 10,
    'pH': 5.77,
    'type': MaltType.BASE
  },
  {
    'id': 4,
    'name': 'CaraHell',
    'weight': 0.25,
    'color': 15,
    'pH': 5.12,
    'type': MaltType.CRYSTAL
  }
]
