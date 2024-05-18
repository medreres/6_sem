import React, {FC, ReactNode} from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';

interface ForecastDetailContainerProps {
  text: ReactNode;
  icon: ImageSourcePropType;
}

export const ForecastDetailContainer: FC<ForecastDetailContainerProps> = ({
  icon,
  text,
}) => {
  return (
    <View className="space-x-2 items-center">
      <Image source={icon} className="h-6 w-6" />
      <Text className="text-white font-semibold text-base">{text}</Text>
    </View>
  );
};
