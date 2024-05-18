import {useLazyQuery} from '@apollo/client';
import {useCallback} from 'react';

import {UseForecastCards} from './types';
import {City} from '../../city';
import {FORECAST_CARD, FORECAST_CARDS} from '../requests';
import {ForecastCard} from '../requests/types';

export const useForecastCards: UseForecastCards = (cities: City[]) => {
  const [fetchCards] = useLazyQuery<{forecasts: ForecastCard[]}>(
    FORECAST_CARDS,
    {
      variables: {
        cities: cities.map(city => ({
          cityName: city.address,
        })),
      },
    },
  );

  const [fetchCardRaw] = useLazyQuery<{forecast: ForecastCard}>(FORECAST_CARD);

  const fetchCard = useCallback(
    (cityName: string) =>
      fetchCardRaw({
        variables: {
          city: {
            cityName,
          },
        },
      }),
    [fetchCardRaw],
  );

  return {
    fetchCards,
    fetchCard,
  };
};
