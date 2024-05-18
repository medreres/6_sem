import { ReactNode } from "react";

import { Daily } from "@/features";

export interface SummaryParams {
  data: Daily;
  expanded: boolean;
}

export interface WeatherAccordionBodyParams {
  feelsLike: number;
  timestamp: string;
  sunrise: string;
  sunset: string;
  minTemp: number;
  description: string;
  maxTemp: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  uvi: number;
  icon: string;
}

export interface HeaderParams {
  feelsLike: number;
  description: string;
  icon: string;
  precipitation: number;
  windSpeed: number;
}

export interface DescriptionParams {
  feelsLike: number;
  description: string;
  icon: string;
}

export interface WeatherAccordionParams {
  defaultExpanded: boolean;
  data: Daily;
}

type Cell = {
  label: ReactNode;
  value: ReactNode;
};

export type FormattedData = [Cell, Cell][];
