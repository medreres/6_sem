import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useForecastCards, useUser } from "@/features";

import { ForecastCards } from "../requests/interfaces/forecastCards";

import { UseCards } from "./interfaces";

export const useCards: UseCards = () => {
  const {
    user: { cities },
    authenticated,
  } = useUser();
  const router = useRouter();

  /**
   * * possibly could be bug when delete from following cities, but settimeout didn't fire
   * * so that city is not deleted from following
   */
  const { fetchCards, fetchCard } = useForecastCards(cities);
  const [cards, setCards] = useState<ForecastCards>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * * if cities now more than cards, then find the difference and fetch those cities
   * * if cities less then cards, then just send request for that one card
   */
  useEffect(() => {
    /**
     * * not the best architectural solution,
     * * with cookies flag like signedIn would way easier to handle
     */

    if (authenticated == false) {
      return router.push("/auth");
    }

    if (cities.length != 0 && cities.length == cards.length) {
      return;
    }

    // if remove city - plainly remove card from state instead of fetching new cards
    if (cities.length < cards.length) {
      return setCards((prevState) =>
        prevState.filter((card) => cities.find((city) => city.address === card.city.address))
      );
    }

    // if only one card added - simply fetch that last card
    if (cities.length + 1 === cards.length) {
      const fetchLastCard = async () => {
        const { data } = await fetchCard(cities[cities.length - 1].address);

        setCards((prevState) => [...prevState, data!.forecast]);
      };

      fetchLastCard();

      return;
    }

    /*
     * could be optimized when changing state of cities by plainly fetching forecast for the last
     * city added, now it refetches all the cards
     * */
    const fetch = async () => {
      setLoading(true);

      const { data } = await fetchCards();

      setCards(data?.forecasts || []);
      setLoading(false);
    };

    fetch();
  }, [authenticated, cards.length, cities, fetchCard, fetchCards, router]);

  return {
    loading,
    cards,
  };
};
