export interface MeResponse {
  email: string;
  cities: CityWithCoordinates[];
}

export interface CityWithCoordinates {
  name: string;
  address: string;
  lat: number;
  lon: number;
}
