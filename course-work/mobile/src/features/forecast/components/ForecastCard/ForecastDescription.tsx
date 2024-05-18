import React, {FC} from 'react';
import {Text, View} from 'react-native';

type ForecastDescriptionProps = {
  description: string;
};

export const ForecastDescription: FC<ForecastDescriptionProps> = ({
  description,
}) => {
  return (
    <View>
      <Text className="text-white font-semibold">{description}</Text>
    </View>
  );
};
