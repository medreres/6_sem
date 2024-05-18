import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {BackgroundVideo} from './BackgroundVideo';
import {ForecastDescription} from './ForecastDescription';
import {Location} from './Location';
import {Temperature} from './Temperature';
import {getForecastVideo} from '../../utils';

interface ForecastCardProps {
  onPress: () => void;
  cityName: string;
  address: string;
  weatherDescription: string;
  weatherId: string;
  temperature: {
    min: number;
    max: number;
    current: number;
  };
}

export const ForecastCard: FC<ForecastCardProps> = ({
  onPress,
  cityName,
  address,
  weatherDescription,
  temperature,
  weatherId,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="flex flex-row px-5 relative bg-blue-400 rounded-2xl">
      <BackgroundVideo source={getForecastVideo(weatherId)} />
      <View className="flex flex-1 flex-row justify-between">
        <View className="flex flex-col justify-between">
          <Location city={cityName} address={address} />
          <ForecastDescription description={weatherDescription} />
        </View>
      </View>
      <Temperature {...temperature} />
    </TouchableOpacity>
  );
};
