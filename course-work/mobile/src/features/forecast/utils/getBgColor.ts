const colorMap: {[key: string]: string} = {
  '01d': '#6E95AC',
  '01n': '#02294A',
  '02d': '#7BA6E7',
  '02n': '#010C34',
  '03d': '#6AA5E1',
  '03n': '#6AA5E1',
  '04d': '#6B7D9D',
  '04n': '#6B7D9D',
  '09d': '#5B7480',
  '09n': '#5B7480',
  '10d': '#8F939D',
  '10n': '#8F939D',
  '11d': '#201C1F',
  '11n': '#201C1F',
  '13d': '#9C9DA9',
  '13n': '#9C9DA9',
  '50d': '#9EA2AC',
  '50n': '#9EA2AC',
};

export const getBgColor = (openWeatherIconId: string): string => {
  return colorMap[openWeatherIconId];
};
