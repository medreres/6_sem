import {Spinner, Stack, Text} from 'native-base';
import React, {FC} from 'react';
import {Image, SafeAreaView, View, ViewBase} from 'react-native';

import {CloudSun} from '../shared/assets';

interface LoadingScreenProps {
  text?: string;
  spinner?: boolean;
}

export const LoadingScreen: FC<LoadingScreenProps> = ({text, spinner}) => {
  return (
    <View className="flex-1 bg-black justify-center">
      <Stack alignItems="center" space="2xl">
        <Image source={CloudSun} />
        <Text className="text-white text-lg font-semibold">
          {text || 'Welcome to Weather App!'}
        </Text>
        {spinner && <Spinner size="lg" />}
      </Stack>
      <View className="h-1/4" />
    </View>
  );
};
