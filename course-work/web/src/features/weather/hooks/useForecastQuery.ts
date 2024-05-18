import { useQuery } from "@apollo/client";

import { FORECAST, Forecast } from "../requests";

import { UseForecastQuery } from "./interfaces";

export const useForecastQuery: UseForecastQuery = (cityName: string) => {
  const { loading, data, error } = useQuery<{ forecast: Forecast }>(FORECAST, {
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
