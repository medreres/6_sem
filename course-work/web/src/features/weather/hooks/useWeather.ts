import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useCity, useHistoryContext, useUser } from "@/features";

import { UseWeather } from "./interfaces";
import { useForecastQuery } from "./useForecastQuery";

export const useWeather: UseWeather = () => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favoriteLoading, setFavoriteLoading] = useState<boolean>(false);

  const { get } = useSearchParams();
  const { data, loading, error } = useForecastQuery(get("city") || "");

  const { addHistory } = useHistoryContext();
  const { addCity, removeCity } = useCity();

  const {
    user: { cities },
  } = useUser();

  useEffect(() => {
    if (!data) {
      return;
    }

    setIsFavorite(() => Boolean(cities.find((city) => city.address === data.forecast.city.address)));
  }, [cities, data]);

  useEffect(() => {
    if (error) {
      throw new Error(error.message);
    }
  }, [error]);

  const toggleFavorite = useCallback(async () => {
    if (!data) {
      throw new Error("No data");
    }

    setFavoriteLoading(true);

    // could be optimized just add needed card data instead of fetching from api
    try {
      if (!isFavorite) {
        await addCity(data.forecast.city.address);
      } else {
        await removeCity(data.forecast.city.address);
      }
    } catch (error: any) {
      const errorMessage = error.message;

      addHistory({
        message: errorMessage,
        severity: "error",
      });
    }

    setFavoriteLoading(false);
  }, [addCity, addHistory, data, isFavorite, removeCity]);

  return {
    loading: loading && !error,
    weather: data?.forecast,
    toggleFavorite,
    isFavorite,
    favoriteLoading,
  };
};
