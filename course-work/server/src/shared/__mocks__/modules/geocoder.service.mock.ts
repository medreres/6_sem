import { City } from '@prisma/client';

import { CityWithCoordinates, ResponseWithError } from '@/shared';

export const mockGeocoderService = {
  async fetchAddress(
    cityName: string,
  ): Promise<ResponseWithError<CityWithCoordinates>> {
    return {
      data: {
        address: cityName,
        name: cityName,
        lat: 0,
        lon: 0,
      },
    };
  },

  async fetchPlacePredictions(cityName: string): Promise<City[]> {
    return [
      {
        address: cityName,
        name: cityName,
        lat: 0,
        lon: 0,
      },
    ];
  },
};
