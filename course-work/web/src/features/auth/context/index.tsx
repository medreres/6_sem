"use client";

import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";

import { FindCityResponse } from "@/features";

import { useMe } from "../hooks";
import { MeResponse } from "../requests";

import { initialState, initialUserState } from "./data";
import { UserData } from "./interfaces";

export const AuthContext = createContext(initialState);
export const useUserContext = () => useContext(AuthContext);

export * from "./data";
export * from "./interfaces";

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { me } = useMe();
  const [data, setData] = useState<UserData>(initialUserState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const setCities = useCallback((cities: FindCityResponse[]) => {
    setData((prevState) => ({
      ...prevState,
      cities,
    }));
  }, []);

  useEffect(() => {
    if (authenticated == false) {
      return;
    }

    const fetchUser = async () => {
      let data: MeResponse;
      let authenticated: boolean;

      try {
        const { data: response, error } = await me();

        if (error || !response?.me) {
          throw new Error();
        }

        data = response.me;
        authenticated = true;
      } catch (error) {
        authenticated = false;
        data = initialUserState;
      }

      setData(data);
      setAuthenticated(authenticated);
      setIsLoading(false);
    };

    fetchUser();
  }, [authenticated, me]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        authenticated,
        setAuthenticated,
        data,
        setData,
        setCities,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
