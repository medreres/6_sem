import { Forecast } from "../../requests";

export type UseWeather = () => {
  loading: boolean;
  weather: Forecast | undefined;
  toggleFavorite: () => Promise<void>;
  isFavorite: boolean;
  favoriteLoading: boolean;
};
