import {Box, ScrollView, Stack, Text} from 'native-base';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {ClockIcon} from 'react-native-heroicons/outline';

import {WeatherIcon} from './WeatherIcon';
import {HourlyWeather} from '../requests/types';

interface WeatherHourlyProps {
  hourly: HourlyWeather;
  bgColor: string;
}

const style = StyleSheet.create({
  container: {
    opacity: 0.8,
  },
});

export const WeatherHourly: FC<WeatherHourlyProps> = ({hourly, bgColor}) => {
  return (
    <Box
      className="flex flex-col w-full bg-blue-400 mb-3 mt-16 rounded-xl px-3"
      style={{
        ...style.container,
        backgroundColor: bgColor,
      }}>
      <Box className="flex flex-row items-center mx-3 py-3 border-b-2 border-b-slate-200">
        <ClockIcon color="#fff" />
        <Text className="text-white ml-1">Hourly forecast</Text>
      </Box>
      <ScrollView horizontal>
        {hourly.map(item => (
          <Stack
            className="p-3 items-center gap-3 justify-between"
            key={item.timestamp}>
            <Text className="text-white font-semibold">
              {new Date(item.timestamp).toLocaleString('en', {
                hour: 'numeric',
              })}
            </Text>
            <WeatherIcon
              alt={item.weather[0].main}
              humidity={item.humidity}
              icon={item.weather[0].icon}
            />
            <Text className="text-white font-semibold text-base">
              {item.temperature.toFixed(0)}&#176;
            </Text>
          </Stack>
        ))}
      </ScrollView>
    </Box>
  );
};
