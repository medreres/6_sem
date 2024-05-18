import { useCallback, useEffect, useState } from "react";

import { FindCityResponse, useHistoryContext, useUserContext } from "@/features";
import { HISTORY_LIFE } from "@/features/history/config";

import { DEBOUNCE_TIME } from "../../weather/config";

import { useCityRequests } from "./useCityRequests";

export const useCity = () => {
  const { data, setCities } = useUserContext();

  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<FindCityResponse[]>([]);
  const { addCity, findCity, removeCity } = useCityRequests();
  const { addHistory } = useHistoryContext();

  const isCityFavorite = useCallback(
    (cityName: string) => {
      return data.cities.find((city) => city.address === cityName);
    },
    [data.cities]
  );

  const addCityHandler = useCallback(
    async (cityName: string, bypassCheck?: true) => {
      if (!bypassCheck && isCityFavorite(cityName)) {
        throw new Error(`Cannot add city ${cityName}`);
      }

      try {
        const oldCities = [...data.cities];

        setCities([
          ...oldCities,
          {
            address: cityName,
            name: cityName,
          },
        ]);

        const sendRequest = setTimeout(() => addCity({ variables: { cityName } }), HISTORY_LIFE);

        const rollBack = () => {
          clearTimeout(sendRequest);
          setCities(oldCities);
        };

        addHistory({
          message: `City ${cityName} successfully added`,
          severity: "success",
          action: {
            label: "UNDO",
            action: rollBack,
          },
        });
      } catch (error: any) {
        addHistory({
          message: error.message,
          severity: "error",
        });
      }
    },
    [addCity, addHistory, isCityFavorite, data.cities, setCities]
  );

  const removeCityHandler = useCallback(
    async (cityName: string, bypassCheck?: boolean) => {
      if (!bypassCheck && !isCityFavorite(cityName)) {
        throw new Error(`Cannot delete city ${cityName}`);
      }

      const oldCities = [...data.cities];

      setCities(oldCities.filter((city) => city.address !== cityName));

      const sendRequest = setTimeout(async () => {
        await removeCity({ variables: { cityName } });
      }, HISTORY_LIFE);

      const rollBack = () => {
        clearTimeout(sendRequest);
        setCities(oldCities);
      };

      addHistory({
        message: `City ${cityName} successfully removed`,
        severity: "info",
        action: {
          label: "UNDO",
          action: rollBack,
        },
      });
    },
    [addHistory, isCityFavorite, data.cities, removeCity, setCities]
  );

  useEffect(() => {
    if (!inputValue) {
      return setLoading(false);
    }

    setLoading(true);

    const cleanup = setTimeout(async () => {
      const { data } = await findCity({
        variables: { city: { cityName: inputValue } },
      });

      setOptions(data!.findCity);

      setLoading(false);
    }, DEBOUNCE_TIME);

    return () => clearTimeout(cleanup);
  }, [addHistory, findCity, inputValue]);

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
