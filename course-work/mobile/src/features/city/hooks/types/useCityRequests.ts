import {
  ApolloCache,
  FetchResult,
  LazyQueryExecFunction,
  MutationFunctionOptions,
} from '@apollo/client';

import {CityInput} from '../../../../shared';
import {
  AddCityResponse,
  FindCityResponse,
  RemoveCityResponse,
} from '../../requests';

export type UseCityRequests = () => {
  addCity: (
    _options?:
      | MutationFunctionOptions<
          {
            addCity: AddCityResponse;
          },
          CityInput,
          AddCityResponse,
          ApolloCache<any>
        >
      | undefined,
  ) => Promise<
    FetchResult<{
      addCity: AddCityResponse;
    }>
  >;
  removeCity: (
    _options?:
      | MutationFunctionOptions<
          {
            removeCity: RemoveCityResponse;
          },
          CityInput,
          RemoveCityResponse,
          ApolloCache<any>
        >
      | undefined,
  ) => Promise<
    FetchResult<{
      removeCity: RemoveCityResponse;
    }>
  >;
  findCity: LazyQueryExecFunction<
    {findCity: FindCityResponse},
    {city: CityInput}
  >;
};
