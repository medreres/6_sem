import {ForecastCard} from '../../requests/types';

export type UseCards = () => {
  loading: boolean;
  cards: ForecastCard[];
};
