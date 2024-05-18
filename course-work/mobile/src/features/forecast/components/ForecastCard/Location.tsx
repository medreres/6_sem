import React, {FC} from 'react';
import {Text, View} from 'react-native';

export type LocationProps = {
  city: string;
  address: string;
};

export const Location: FC<LocationProps> = ({city, address}) => {
  return (
    <View>
      <Text className="text-white text-2xl font-semibold">{city}</Text>
      <Text className="text-white font-semibold w-28 h-10 truncate">
        {address}
      </Text>
    </View>
  );
};
