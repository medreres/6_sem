import {Stack} from 'native-base';
import React, {FC} from 'react';
import {Image, StyleSheet, Text} from 'react-native';

import {getForecastImage, isHumidWeather} from '../utils';

interface WeatherIconsProps {
  icon: string;
  alt: string;
  humidity: number;
}

const style = StyleSheet.create({
  image: {
    height: 28,
    width: 28,
  },
});

export const WeatherIcon: FC<WeatherIconsProps> = ({icon, humidity}) => {
  return (
    <Stack className="items-center justify-center text-right">
      <Image style={style.image} alt={icon} source={getForecastImage(icon)} />
      {isHumidWeather(icon) && (
        <Text className="text-blue-600 text-xs">{humidity}%</Text>
      )}
    </Stack>
  );
};
