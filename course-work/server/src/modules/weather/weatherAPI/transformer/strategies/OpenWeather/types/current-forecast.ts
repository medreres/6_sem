import { SharedProperties } from './shared-properties';

export interface CurrentForecast extends SharedProperties {
  feels_like: number;
}
