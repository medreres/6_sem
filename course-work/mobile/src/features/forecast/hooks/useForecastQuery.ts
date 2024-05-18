import {useQuery} from '@apollo/client';

import {UseForecastQuery} from './types';
import {FORECAST} from '../requests';
import {Forecast} from '../requests/types';

export const useForecastQuery: UseForecastQuery = (cityName: string) => {
  const {loading, data, error} = useQuery<{forecast: Forecast}>(FORECAST, {
    variables: {
      city: {
        cityName,
      },
    },
  });

  return {
    loading,
    data,
    error,
  };
};
