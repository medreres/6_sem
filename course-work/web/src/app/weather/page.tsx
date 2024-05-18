"use client";

import { FC, Suspense } from "react";

import { Loading, Protected } from "@/components";
import { useWeather, WeatherAccordion, WeatherHeader } from "@/features";

export default function Weather() {
  const { loading, weather } = useWeather();

  return (
    <Protected>
     {loading && <Loading />}
      {!loading && weather && (
        <>
          <WeatherHeader cityName={weather.city.name} />
          {weather.daily.map((day, index) => (
            <WeatherAccordion
              key={index}
              data={day}
              defaultExpanded={index === 0}
            />
          ))}
        </>
      )}
    </Protected>
  );
}

