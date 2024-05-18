import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';

import {ForecastCards, Search, useCards, useCity} from '../features';
import {ForecastProps, Loading, RootNavigation, UserMenu} from '../shared';

type Props = NativeStackScreenProps<RootNavigation, 'Home', 'Forecast'>;

export const HomeScreen: FC<Props> = ({navigation}) => {
  const {removeCity} = useCity();
  const {cards, loading} = useCards();

  const handlePress = (params: ForecastProps) =>
    navigation.navigate('Forecast', params);

  return (
    <View className="flex-1 bg-black text-white">
      <StatusBar barStyle="light-content" />
      <SafeAreaView className="flex-1 mx-4">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-white text-3xl font-semibold mb-3">
            Weather
          </Text>
          <UserMenu />
        </View>
        <Search navigation={navigation} />

        {loading && <Loading />}
        {!loading && !cards.length && (
          <View className="flex flex-1 justify-center">
            <Text className="text-white mr-auto ml-auto">
              No cities added yet!
            </Text>
          </View>
        )}
        {!loading && cards && (
          <ForecastCards
            cards={cards}
            handleOpen={handlePress}
            handleDelete={removeCity}
          />
        )}
      </SafeAreaView>
    </View>
  );
};
