import { Forecast } from '../../dto';

import { TransformerStrategy } from './types';
import { Params } from './types';

export * from './strategies';
export * from './types';

export class WeatherTransformer {
  constructor(private readonly strategy: TransformerStrategy) {}

  transform(weather: any, params?: Params): Forecast {
    return this.strategy.transform(weather, params);
  }
}
