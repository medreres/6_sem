import {useLazyQuery, useMutation} from '@apollo/client';

import {UseCityRequests} from './types';
import {CityInput} from '../../../shared';
import {
  ADD_CITY,
  AddCityResponse,
  FIND_CITY,
  FindCityResponse,
  REMOVE_CITY,
  RemoveCityResponse,
} from '../requests';

/**
 * * could find way to create interface for return types like addCity
 */

export const useCityRequests: UseCityRequests = () => {
  const [addCity] = useMutation<
    {addCity: AddCityResponse},
    CityInput,
    AddCityResponse
  >(ADD_CITY);
  const [removeCity] = useMutation<
    {removeCity: RemoveCityResponse},
    CityInput,
    RemoveCityResponse
  >(REMOVE_CITY);
  const [findCity] = useLazyQuery<
    {findCity: FindCityResponse},
    {city: CityInput}
  >(FIND_CITY);

  return {
    addCity,
    removeCity,
    findCity,
  };
};
