import axios, { AxiosInstance } from 'axios';
import nodeGeocoder from 'node-geocoder';

import { City } from '@/shared';

import { BASE_URL } from './constants';
import { Endpoints } from './endpoints';
import { CityPredictionTransformer, GooglePlacesStrategy } from './transformer';
import { Address, GeocoderApiParams } from './types';

export class GeocodeApi {
  private readonly geocodeAPI: AxiosInstance;
  private readonly geocoder: nodeGeocoder.Geocoder;
  private readonly transformer: CityPredictionTransformer;

  constructor(params: GeocoderApiParams) {
    this.geocodeAPI = axios.create({
      baseURL: BASE_URL,
      params: {
        key: params.apiKey,
      },
    });

    this.geocoder = nodeGeocoder({
      provider: 'google',
      apiKey: params.apiKey,
    });

    this.transformer = new CityPredictionTransformer(
      new GooglePlacesStrategy(),
    );
  }

  async fetchAddress(cityName: string): Promise<Address> {
    const response = await this.geocoder.geocode(cityName);

    try {
      const name =
        response[0].city || response[0].administrativeLevels!.level1long!;

      const result = {
        name,
        lat: response[0].latitude || 0,
        lon: response[0].longitude || 0,
        address: response[0].formattedAddress || name,
      };

      return result;
    } catch (error: any) {
      throw new Error('Address is not found.');
    }
  }

  async fetchPlacePredictions(cityName: string): Promise<City[]> {
    const a = await this.geocodeAPI({
      url: Endpoints.placesSuggestions,
      params: {
        input: cityName,
        sensor: 'false',
        types: '(cities)',
      },
    });
    const resultFormatted = this.transformer.transform(a.data.predictions);

    return resultFormatted;
  }
}
