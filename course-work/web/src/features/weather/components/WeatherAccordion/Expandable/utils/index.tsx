import { Barometer, Humidity, Sunrise, Sunset, Temperature } from "@/assets";
import { getTime } from "@/utils";

import { FormattedData, WeatherAccordionBodyParams } from "../../interfaces";
import { Cell } from "../Cell";

export const formatData = (data: WeatherAccordionBodyParams): FormattedData => [
  [
    {
      label: (
        <Cell
          alt="humidity"
          img={Humidity}
          label="Humidity"
        />
      ),
      value: `${data.humidity}%`,
    },
    {
      label: (
        <Cell
          direction="row-reverse"
          alt="uv index"
          img={Barometer}
          label="UV index"
        />
      ),
      value: data.uvi,
    },
  ],
  [
    {
      label: (
        <Cell
          alt="sunrise"
          img={Sunrise}
          label="Sunrise"
        />
      ),
      value: getTime(data.sunrise),
    },
    {
      label: (
        <Cell
          direction="row-reverse"
          alt="sunset"
          img={Sunset}
          label="Sunset"
        />
      ),
      value: getTime(data.sunset),
    },
  ],
  [
    {
      label: (
        <Cell
          alt="Min temperature"
          img={Temperature}
          label="Min temperature"
        />
      ),
      value: `${data.minTemp} °C`,
    },
    {
      label: (
        <Cell
          direction="row-reverse"
          alt="Max temperature"
          img={Temperature}
          label="Max temperature"
        />
      ),
      value: `${data.maxTemp} °C`,
    },
  ],
];
