import { ApolloError } from "@apollo/client";

import { Forecast } from "../../requests";

export type UseForecastQuery = (_cityName: string) => {
  loading: boolean;
  data:
    | {
        forecast: Forecast;
      }
    | undefined;
  error: ApolloError | undefined;
};
