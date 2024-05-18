import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { City, CityWithCoordinates, ResponseWithError } from '@/shared';

import { GeocodeApi } from './geocodeAPI';

@Injectable()
export class GeocoderService {
  private readonly logger = new Logger(GeocoderService.name);
  private readonly geocodeApi;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get('GOOGLE_API_TOKEN');

    this.geocodeApi = new GeocodeApi({
      apiKey,
    });
  }

  async fetchAddress(
    cityName: string,
  ): Promise<ResponseWithError<CityWithCoordinates>> {
    this.logger.verbose(`Searching for coordinates of city ${cityName}`);
    try {
      const response = await this.geocodeApi.fetchAddress(cityName);

      return {
        data: response,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  getCitiesPrediction(cityName: string): Promise<City[]> {
    return this.geocodeApi.fetchPlacePredictions(cityName);
  }
}
