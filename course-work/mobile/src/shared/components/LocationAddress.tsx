import React, {FC} from 'react';
import {Text, View} from 'react-native';

interface LocationAddressProps {
  cityName: string;
}

export const LocationAddress: FC<LocationAddressProps> = ({cityName}) => {
  return (
    <View className="items-center">
      <Text className="text-white text-center text-2xl font-bold">
        {cityName}
      </Text>
    </View>
  );
};
