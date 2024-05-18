import {Forecast} from '../../requests/types';

export type UseForecast = (cityAddress: string) => {
  loading: boolean;
  weather: Forecast | undefined;
  toggleFavorite: () => Promise<void>;
  isFavorite: boolean;
  favoriteLoading: boolean;
};
