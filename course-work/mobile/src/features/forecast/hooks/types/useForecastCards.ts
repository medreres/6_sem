import {
  LazyQueryExecFunction,
  OperationVariables,
  QueryResult,
} from '@apollo/client';

import {City} from '../../../city';
import {ForecastCard} from '../../requests/types';

export type UseForecastCards = (_cities: City[]) => {
  fetchCards: LazyQueryExecFunction<
    {
      forecasts: ForecastCard[];
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
