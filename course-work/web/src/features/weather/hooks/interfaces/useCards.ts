import { ForecastCards } from "../../requests";

export type UseCards = () => {
  loading: boolean;
  cards: ForecastCards;
};
