import { ReactNode } from "react";

export interface BodyParams {
  humidity: number;
  windSpeed: number;
}

export interface DescriptionParams {
  feelsLike: number;
  icon: string;
}

export interface WeatherCardParams {
  cityName: string;
  address: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  img: string;
}

export interface InfoParams {
  text: ReactNode;
  icon: ReactNode;
}
