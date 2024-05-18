import React from 'react';
import {View} from 'react-native';

import {Tabs} from '../features';

export const AuthScreen = () => {
  return (
    <View className="flex-1 bg-black justify-end">
      <Tabs />
    </View>
  );
};
