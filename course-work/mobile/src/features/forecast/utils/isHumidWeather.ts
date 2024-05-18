const humidWeatherIdRegex = /^09|10/;

export const isHumidWeather = (weatherId: string): boolean =>
  Boolean(humidWeatherIdRegex.exec(weatherId));
