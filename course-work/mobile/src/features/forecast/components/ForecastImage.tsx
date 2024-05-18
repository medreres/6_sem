import React, {FC} from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';

interface ForecastImageProps {
  image: ImageSourcePropType;
}

export const ForecastImage: FC<ForecastImageProps> = ({image}) => {
  return (
    <View className="flex-row justify-center">
      <Image source={image} />
    </View>
  );
};
