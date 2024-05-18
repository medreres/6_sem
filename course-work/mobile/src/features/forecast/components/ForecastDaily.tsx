import {Box, Stack} from 'native-base';
import React, {FC} from 'react';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {CalendarDaysIcon} from 'react-native-heroicons/outline';

import {WeatherIcon} from './WeatherIcon';
import {Daily} from '../requests/types';
import {getDay} from '../utils';

interface ForecastDailyProps {
  forecastDaily: Daily[];
  bgColor: string;
}

const style = StyleSheet.create({
  container: {
    opacity: 0.8,
  },
});

export const ForecastDaily: FC<ForecastDailyProps> = ({
  forecastDaily,
  bgColor,
}) => {
  return (
    <Stack
      className="bg-blue-300 rounded-md px-5"
      style={{
        ...style.container,
        backgroundColor: bgColor,
      }}>
      <Box className=" py-2 flex flex-row items-center">
        <CalendarDaysIcon color="#fff" />
        <Text className="text-white ml-1 py-2 flex flex-row items-center">
          8-day Forecast
        </Text>
      </Box>
      {forecastDaily.map(daily => (
        <Stack
          flexDirection="row"
          alignItems="center"
          className="border-t-2 border-t-slate-200 py-2 justify-between"
          key={daily.timestamp}>
          <Text className="text-white text-left w-8">
            {getDay(daily.timestamp, false)}
          </Text>
          <WeatherIcon
            alt={daily.weather[0].icon}
            icon={daily.weather[0].icon}
            humidity={daily.humidity}
          />
          <Stack flexDirection="row" justifyContent="flex-start">
            <Text className="text-left font-bold text-white text-xl tracking-widest w-20">
              H: {daily.temperature.max.toFixed(0)}&#176;
            </Text>
            <Text className="text-center font-bold text-white text-xl tracking-widest">
              L: {daily.temperature.min.toFixed(0)}&#176;
            </Text>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
