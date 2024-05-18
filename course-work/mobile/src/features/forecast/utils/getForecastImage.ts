import {ImageSourcePropType} from 'react-native';

import {
  Bolt,
  BrokenClouds,
  Cloud,
  CloudMoon,
  CloudMoonRain,
  CloudSun,
  CloudSunRain,
  Haze,
  Moon,
  Rain,
  Snow,
  Sun,
} from '../../../shared';

const iconMap: {[key: string]: ImageSourcePropType} = {
  '01d': Sun,
  '01n': Moon,
  '02d': CloudSun,
  '02n': CloudMoon,
  '03d': Cloud,
  '03n': Cloud,
  '04d': BrokenClouds,
  '04n': BrokenClouds,
  '09d': Rain,
  '09n': Rain,
  '10d': CloudSunRain,
  '10n': CloudMoonRain,
  '11d': Bolt,
  '11n': Bolt,
  '13d': Snow,
  '13n': Snow,
  '50d': Haze,
  '50n': Haze,
};

export const getForecastImage = (
  openWeatherIconId: string,
): ImageSourcePropType => {
  return iconMap[openWeatherIconId];
};
