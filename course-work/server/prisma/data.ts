import { City } from '@prisma/client';

export const cities: City[] = [
  {
    name: 'Berlin',
    address: 'Berlin, Germany',
    lat: 52.52000659999999,
    lon: 13.404954,
  },
  {
    name: 'Kyiv',
    address: 'Kyiv, Ukraine, 02000',
    lat: 50.4501,
    lon: 30.5234,
  },
  {
    name: 'Lviv',
    address: 'Lviv, Lviv Oblast, Ukraine, 79000',
    lat: 49.839683,
    lon: 24.029717,
  },
  {
    name: 'Moscow',
    address: 'Moscow, Russia',
    lat: 55.755826,
    lon: 37.6173,
  },
];
