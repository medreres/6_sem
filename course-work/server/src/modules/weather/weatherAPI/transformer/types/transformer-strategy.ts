import { Forecast } from '../../../dto';

import { Params } from '.';

export interface TransformerStrategy {
  transform(data: any, params?: Params): Forecast;
}
