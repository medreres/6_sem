import { City } from '@/shared';

import { TransformerStrategy } from './strategies/types';

export * from './strategies';
export * from './types';

export class CityPredictionTransformer {
  constructor(private readonly strategy: TransformerStrategy) {}

  transform(predictions: any): City[] {
    return this.strategy.transform(predictions);
  }
}
