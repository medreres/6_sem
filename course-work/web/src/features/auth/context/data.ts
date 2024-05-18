import { FindCityResponse } from "@/features";

import { AuthState } from "./interfaces";

export const initialUserState = {
  cities: [],
  email: "",
};

export const initialState: AuthState = {
  data: initialUserState,
  setData: () => {},

  authenticated: null,
  setAuthenticated: () => {},

  isLoading: true,
  setIsLoading: () => {},

  setCities: (_cities: FindCityResponse[]) => {},
};
