import { useCallback } from "react";
import { useLazyQuery } from "@apollo/client";

import { FindCityResponse } from "@/features";

import { FORECAST_CARDS, ForecastCard, ForecastCards } from "../requests";
import { FORECAST_CARD } from "../requests/forecastCard";

import { UseForecastCards } from "./interfaces";

export const useForecastCards: UseForecastCards = (cities: FindCityResponse[]) => {
  const [fetchCards] = useLazyQuery<{ forecasts: ForecastCards }>(FORECAST_CARDS, {
    variables: {
      cities: cities.map((city) => ({
        cityName: city.address,
      })),
    },
  });

  const [fetchCardRaw] = useLazyQuery<{ forecast: ForecastCard }>(FORECAST_CARD);

  const fetchCard = useCallback(
    (cityName: string) =>
      fetchCardRaw({
        variables: {
          city: {
            cityName,
          },
        },
      }),
    [fetchCardRaw]
  );

  return {
    fetchCards,
    fetchCard,
  };
};
