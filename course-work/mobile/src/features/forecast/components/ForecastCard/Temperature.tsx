import React, {FC} from 'react';
import {Text, View} from 'react-native';

export type TemperatureProps = {
  current: number;
  min: number;
  max: number;
};

export const Temperature: FC<TemperatureProps> = ({max, min, current}) => {
  return (
    <View className="flex flex-col justify-between text-white">
      <Text className="text-5xl text-white mt-1">
        {current.toFixed(0)}&#176;
      </Text>
      <View className="flex flex-row text-white">
        <Text className="text-white">H: {max.toFixed(0)}&#176;</Text>
        <Text className="text-white">L: {min.toFixed(0)}&#176;</Text>
      </View>
    </View>
  );
};
