export const getTime = (date: Date): string =>
  date.toLocaleString('en', {
    hour: '2-digit',
    minute: '2-digit',
  });

export const getDay = (date: Date | string, withNumber = true): string => {
  const dateConverted = typeof date === 'string' ? new Date(date) : date;

  const formatted = dateConverted
    .toLocaleDateString('en', {weekday: 'short', day: 'numeric'})
    .split(' ');

  return withNumber ? formatted.join(', ') : formatted[0];
};

export const formatSpeed = (speed: number): string =>
  `${speed.toFixed(0)} km/h`;

export const formatHumidity = (humidity: number): string => `${humidity}%`;
