/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ResizeMode, Video} from 'expo-av';
import {Button, ScrollView} from 'native-base';
import React, {FC} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';

import {
  ForecastDaily,
  Gradient,
  WeatherHourly,
  WeatherInfo,
  getBgColor,
  getForecastImage,
  getForecastVideo,
  useForecast,
} from '../features';
import {Loading, RootNavigation} from '../shared';

type Props = NativeStackScreenProps<RootNavigation, 'Forecast', 'Home'>;

export const ForecastScreen: FC<Props> = ({navigation}) => {
  const handlePress = () => navigation.navigate('Home');

  const [cityName, cityAddress] = [
    navigation.getState().routes[1].params!.name,
    navigation.getState().routes[1].params!.address,
  ];

  const {weather, loading, toggleFavorite, isFavorite} =
    useForecast(cityAddress);

  return (
    <Gradient fromColor="#125EB0" toColor="#5092D3">
      <View className="flex-1 relative ">
        <StatusBar barStyle="light-content" />

        {loading && !weather && <Loading />}
        {!loading && weather && (
          <>
            <SafeAreaView className="flex flex-col flex-1">
              <Video
                className="absolute top-0 left-0 bottom-0 right-0 opacity-85"
                source={
                  getForecastVideo(weather.daily[0].weather[0].icon) as any // * did not found matching interface
                }
                isMuted
                isLooping
                shouldPlay
                resizeMode={ResizeMode.COVER}
              />

              <ScrollView
                showsVerticalScrollIndicator={false}
                className="mx-4 rounded-xl">
                {!loading && !isFavorite && (
                  <View className="flex flex-row justify-end">
                    <Button variant="ghost" onPress={toggleFavorite}>
                      Add
                    </Button>
                  </View>
                )}
                <WeatherInfo
                  cityName={cityName}
                  temperature={weather.daily[0].temperature}
                  weatherDescription={weather.daily[0].weather[0].main}
                  humidityPercent={weather.daily[0].humidity}
                  sunrise={new Date(weather.daily[0].sunrise)}
                  windSpeedInKmH={weather.daily[0].windSpeed}
                  weatherImage={getForecastImage(
                    weather.daily[0].weather[0].icon,
                  )}
                />
                <WeatherHourly
                  hourly={weather.hourly}
                  bgColor={getBgColor(weather.daily[0].weather[0].icon)}
                />
                <ForecastDaily
                  forecastDaily={weather.daily}
                  bgColor={getBgColor(weather.daily[0].weather[0].icon)}
                />

                <Button mt={5} onPress={handlePress}>
                  Back
                </Button>
              </ScrollView>
            </SafeAreaView>
          </>
        )}
      </View>
    </Gradient>
  );
};
