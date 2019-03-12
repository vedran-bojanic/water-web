import { DecreasePh } from './decrease-ph.model';
import { IncreasePh } from './increase-ph.model';
import { AcidMalt } from './acid-malt.model';

export interface WaterAdjustment {
  decreasePhSaltsMash: DecreasePh | null;
  decreasePhSaltsSparge: DecreasePh | null;
  decreasePhAcid: AcidMalt | null;
  increasePhSaltsMash: IncreasePh | null;
  increasePhSaltsSparge: IncreasePh | null;
}

