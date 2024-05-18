import {Box, Button, Text, useToast} from 'native-base';
import {useCallback, useEffect, useState} from 'react';

import {UseCity} from './types';
import {useCityRequests} from './useCityRequests';
import {Toast} from '../../../shared';
import {useAuthContext} from '../../auth';
import {Constants} from '../constants';
import {FindCityResponse} from '../requests';
import {City} from '../types';

export const useCity: UseCity = () => {
  const {user, setUser} = useAuthContext();
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<FindCityResponse>([]);
  const {addCity, findCity, removeCity} = useCityRequests();
  const toast = useToast();

  const setCities = useCallback(
    (cities: City[]) => {
      setUser(prevState => {
        if (!prevState) {
          throw new Error('User is undefined');
        }

        return {
          email: prevState.email,
          cities,
        };
      });
    },
    [setUser],
  );

  const addCityHandler = useCallback(
    async (city: City, _bypassCheck?: true) => {
      if (!user) {
        throw new Error('User is undefined');
      }

      try {
        const oldCities = [...user.cities];

        setCities([...oldCities, city]);

        const sendRequest = setTimeout(
          () => addCity({variables: {cityName: city.address}}),
          Constants.SNACKBAR_SHOW_DURATION_IN_MS,
        );

        const rollBack = () => {
          clearTimeout(sendRequest);
          setCities(oldCities);
          toast.close(city.name);
        };

        if (!toast.isActive(city.name)) {
          toast.show({
            id: city.name,
            duration: Constants.SNACKBAR_SHOW_DURATION_IN_MS,
            render: Toast.bind(this, {
              title: `City ${city.name} successfully added`,
              action: {
                title: 'UNDO',
                callback: rollBack,
              },
            }),
          });
        }
      } catch (error: any) {
        console.log('error', error);
      }
    },
    [addCity, setCities, toast, user],
  );

  const removeCityHandler = useCallback(
    async (cityName: string) => {
      if (!user) {
        throw new Error('User is undefined');
      }

      const oldCities = [...user.cities];

      setCities(oldCities.filter(city => city.address !== cityName));

      const sendRequest = setTimeout(async () => {
        await removeCity({variables: {cityName}});
      }, Constants.SNACKBAR_SHOW_DURATION_IN_MS);

      const rollBack = () => {
        clearTimeout(sendRequest);
        setCities(oldCities);
        toast.close(cityName);
      };

      if (!toast.isActive(cityName)) {
        toast.show({
          id: cityName,
          duration: Constants.SNACKBAR_SHOW_DURATION_IN_MS,
          render: Toast.bind(this, {
            title: `City ${cityName} successfully removed`,
            action: {
              title: 'UNDO',
              callback: rollBack,
            },
          }),
        });
      }
    },
    [removeCity, setCities, toast, user],
  );

  useEffect(() => {
    if (!inputValue) {
      setOptions([]);
      return setLoading(false);
    }

    setLoading(true);

    const cleanup = setTimeout(async () => {
      try {
        const response = await findCity({
          variables: {
            city: {
              cityName: inputValue,
            },
          },
        });

        setOptions(response.data?.findCity || []);
      } catch (error: any) {
        console.log('error', error);
      }

      setLoading(false);
    }, Constants.DEBOUNCE_TIME_IN_MS);

    return () => clearTimeout(cleanup);
  }, [findCity, inputValue]);

  return {
    loading,
    inputValue,
    setInputValue,
    options,
    setOptions,
    removeCity: removeCityHandler,
    addCity: addCityHandler,
  };
};
