import {
  Bolt,
  BrokenClouds,
  CloudMoon,
  FewClouds,
  Fog,
  LightRain,
  Moon,
  ScatteredClouds,
  ShowerRain,
  Snow,
  Sunny,
} from '../../../shared/assets/videos';

const videoMap: {[key: string]: '*.mov'} = {
  '01d': Sunny,
  '01n': Moon,
  '02d': FewClouds,
  '02n': CloudMoon,
  '03d': ScatteredClouds,
  '03n': ScatteredClouds,
  '04d': BrokenClouds,
  '04n': BrokenClouds,
  '09d': ShowerRain,
  '09n': ShowerRain,
  '10d': LightRain,
  '10n': LightRain,
  '11d': Bolt,
  '11n': Bolt,
  '13d': Snow,
  '13n': Snow,
  '50d': Fog,
  '50n': Fog,
};

export const getForecastVideo = (openWeatherIconId: string): string => {
  return videoMap[openWeatherIconId];
};
