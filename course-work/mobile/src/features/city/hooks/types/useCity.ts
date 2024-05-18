import {FindCityResponse} from '../../requests';
import {City} from '../../types';

export type UseCity = () => {
  loading: boolean;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  options: FindCityResponse;
  setOptions: React.Dispatch<React.SetStateAction<FindCityResponse>>;
  removeCity: (cityName: string) => Promise<void>;
  addCity: (city: City, _bypassCheck?: true) => Promise<void>;
};
