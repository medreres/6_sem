import {Stack} from 'native-base';
import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {MapPinIcon} from 'react-native-heroicons/outline';

import {FindCityResponse} from '../../requests';
import {City} from '../../types';

interface OptionsProps {
  handleClick: (city: City) => void;
  data: FindCityResponse;
}

export const Options: FC<OptionsProps> = ({handleClick, data}) => {
  return (
    <View className="absolute w-full bg-gray-300 top-16 rounded-2xl">
      {data.map((option, index) => {
        const isLast = index === data.length - 1;
        const borderClass = isLast ? '' : 'border-b-2 border-b-gray-400';

        return (
          <TouchableOpacity
            onPress={handleClick.bind(null, option)}
            key={index}
            className={`flex-row items-center border-0 p-3 px-6 mb-1 ${borderClass}`}>
            <MapPinIcon className="mx-10" size={25} />
            <Stack className="ml-2">
              <Text className="text-black text-lg leading-normal">
                {option.name}
              </Text>
              <Text className="flex-1 text-gray-400 text-sm leading-3 pt-1 -mt-1">
                {option.address}
              </Text>
            </Stack>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
