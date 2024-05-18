import { LazyQueryExecFunction, OperationVariables, QueryResult } from "@apollo/client";

import { FindCityResponse } from "@/features";

import { ForecastCard, ForecastCards } from "../../requests";

export type UseForecastCards = (_cities: FindCityResponse[]) => {
  fetchCards: LazyQueryExecFunction<
    {
      forecasts: ForecastCards;
    },
    OperationVariables
  >;
  fetchCard: (_cityName: string) => Promise<
    QueryResult<
      {
        forecast: ForecastCard;
      },
      OperationVariables
    >
  >;
};
