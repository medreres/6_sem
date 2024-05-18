import { useLazyQuery, useMutation } from "@apollo/client";

import { ADD_CITY, FIND_CITY, FindCityResponse, REMOVE_CITY } from "../requests";

/**
 * * could find way to create interface for return types like addCity
 */
export function useCityRequests() {
  const [addCity] = useMutation(ADD_CITY);
  const [removeCity] = useMutation(REMOVE_CITY);
  const [findCity] = useLazyQuery<{ findCity: FindCityResponse[] }>(FIND_CITY);

  return {
    addCity,
    removeCity,
    findCity,
  };
}
