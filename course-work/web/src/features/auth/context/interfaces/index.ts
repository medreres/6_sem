import { FindCityResponse } from "@/features";

export type UserData = {
  email: string;
  cities: FindCityResponse[];
};

export type AuthState = {
  data: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;

  authenticated: boolean | null;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  setCities: (_cities: FindCityResponse[]) => void;
};
