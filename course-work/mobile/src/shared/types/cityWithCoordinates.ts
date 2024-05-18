import {City} from '../../features';

export type CityWithCoordinates = City & {
  lat: number;
  lon: number;
};
