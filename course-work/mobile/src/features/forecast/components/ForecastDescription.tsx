import {Stack} from 'native-base';
import React, {FC} from 'react';
import {Text, View} from 'react-native';

import {TemperatureDaily} from '../requests/types';

interface ForecastDescriptionProps {
  temperature: TemperatureDaily;
  weatherDescription: string;
}

export const ForecastDescription: FC<ForecastDescriptionProps> = ({
  temperature,
  weatherDescription,
}) => {
  return (
    <View>
      <Text className="text-center font-bold text-white text-6xl ml-6">
        {temperature.day.toFixed(0)}&#176;
      </Text>
      <Text className="text-center font-bold text-white text-xl tracking-widest">
        {weatherDescription}
      </Text>
      <Stack direction="row">
        <Text className="text-center font-bold text-white text-xl tracking-widest">
          H: {temperature.max.toFixed(0)}&#176;
        </Text>
        <Text className="text-center font-bold text-white text-xl tracking-widest">
          L: {temperature.min.toFixed(0)}&#176;
        </Text>
      </Stack>
    </View>
  );
};
