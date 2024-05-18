import { City } from '@/shared';

import { Params } from '../types';

export interface TransformerStrategy {
  transform(data: any, params?: Params): City[];
}
