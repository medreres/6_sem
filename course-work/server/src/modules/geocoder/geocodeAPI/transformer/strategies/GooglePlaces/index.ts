import { City } from '@/shared';

import { TransformerStrategy } from '../types';

export class GooglePlacesStrategy implements TransformerStrategy {
  transform(data: any[]): City[] {
    const resultFormatted: City[] = data.map((prediction) => ({
      name: prediction.structured_formatting.main_text,
      address: prediction.description,
    }));

    return resultFormatted;
  }
}
