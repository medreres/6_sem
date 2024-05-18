import {useEffect, useState} from 'react';

import {UseCards} from './types';
import {useForecastCards} from './useForecastCards';
import {useAuthContext} from '../../auth';
import {ForecastCard} from '../requests/types';

export const useCards: UseCards = () => {
  const {user} = useAuthContext();

  const {fetchCards} = useForecastCards(user?.cities || []);
  const [cards, setCards] = useState<ForecastCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * * if cities now more than cards, then find the difference and fetch those cities
   * * if cities less then cards, then just send request for that one card
   */
  useEffect(() => {
    if (!user?.cities || user.cities.length === 0) {
      return;
    }

    // if remove city - plainly remove card from state instead of fetching new cards
    if (user.cities.length < cards.length) {
      return setCards(prevState =>
        prevState.filter(card =>
          user.cities.find(city => city.address === card.city.address),
        ),
      );
    }

    /*
     * could be optimized when changing state of cities by plainly fetching forecast for the last
     * city added, now it refetches all the cards
     **/
    const fetch = async () => {
      setLoading(true);

      const {data} = await fetchCards();

      setCards(data?.forecasts || []);
      setLoading(false);
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCards, user?.cities]);

  return {
    loading,
    cards,
  };
};
