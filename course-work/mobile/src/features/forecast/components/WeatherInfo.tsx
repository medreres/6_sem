import React, {FC} from 'react';
import {ImageSourcePropType, View} from 'react-native';

import {ForecastDescription} from './ForecastDescription';
import {LocationAddress} from '../../../shared';
import {TemperatureDaily} from '../requests/types';

interface WeatherInfoProps {
  cityName: string;
  temperature: TemperatureDaily;
  weatherDescription: string;
  weatherImage: ImageSourcePropType;
  humidityPercent: number;
  sunrise: Date;
  windSpeedInKmH: number;
}

export const WeatherInfo: FC<WeatherInfoProps> = ({
  cityName,
  weatherDescription,
  temperature,
}) => {
  return (
    <View className="mt-5 flex flex-col items-center relative">
      <LocationAddress cityName={cityName} />
      <ForecastDescription
        temperature={temperature}
        weatherDescription={weatherDescription}
      />
    </View>
  );
};
