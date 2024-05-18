import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';

import {UseForecast} from './types';
import {useForecastQuery} from './useForecastQuery';
import {useAuthContext} from '../../auth';
import {useCity} from '../../city';
import {MAX_CITIES} from '../constants';

export const useForecast: UseForecast = (cityName: string) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(true);
  const [favoriteLoading, setFavoriteLoading] = useState<boolean>(false);

  const {data, loading, error} = useForecastQuery(cityName);

  const {addCity, removeCity} = useCity();

  const {user} = useAuthContext();

  useEffect(() => {
    if (!data) {
      return;
    }

    setIsFavorite(() =>
      Boolean(
        user?.cities.find(city => city.address === data.forecast.city.address),
      ),
    );
  }, [data, user?.cities]);

  const toggleFavorite = useCallback(async () => {
    if (!data || !user) {
      throw new Error('No data');
    }

    if (user.cities.length >= MAX_CITIES) {
      return Alert.alert('Too many cities in user list. Remove one');
    }

    setFavoriteLoading(true);

    // could be optimized just add needed card data instead of fetching from api
    try {
      if (!isFavorite) {
        await addCity({
          address: data.forecast.city.address,
          name: data.forecast.city.name,
        });
      } else {
        await removeCity(data.forecast.city.address);
      }
    } catch (requestError: any) {
      console.log('requestError', requestError);
    }

    setFavoriteLoading(false);
  }, [addCity, data, isFavorite, removeCity, user]);

  return {
    loading: loading && !error,
    weather: data?.forecast,
    toggleFavorite,
    isFavorite,
    favoriteLoading,
  };
};
