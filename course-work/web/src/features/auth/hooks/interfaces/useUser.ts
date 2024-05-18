import { Dispatch, SetStateAction } from "react";

import { UserData } from "../../context";

export type AuthData = { email: string; password: string };

export type UseUser = () => {
  user: UserData;
  authenticated: boolean | null;
  setUser: Dispatch<SetStateAction<UserData>>;
  login: (_data: AuthData) => Promise<void>;
  logout: () => Promise<void>;
  register: (_data: AuthData) => Promise<void>;
};
