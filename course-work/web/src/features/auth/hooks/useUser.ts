import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { useHistoryContext } from "@/features/history";

import { useUserContext } from "../context";

import { AuthData, UseUser } from "./interfaces";
import { useUserRequests } from "./useUserRequests";

export const useUser: UseUser = () => {
  const { setData, data, setAuthenticated, authenticated } = useUserContext();
  const { login, logout, register } = useUserRequests();
  const { addHistory } = useHistoryContext();
  const { push } = useRouter();

  const logoutHandler = useCallback(async () => {
    setAuthenticated(false);

    push("/auth");

    logout();
  }, [logout, push, setAuthenticated]);

  const loginHandler = useCallback(
    async ({ email, password }: AuthData) => {
      await login({
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
      });

      push("/");

      // data about user is automatically updated by context
      setAuthenticated(true);

      addHistory({
        message: "Signed in successfully",
        severity: "success",
      });
    },
    [addHistory, login, push, setAuthenticated]
  );

  const registerHandler = useCallback(
    async ({ email, password }: AuthData) => {
      await register({
        variables: {
          email: email,
          password: password,
        },
      });

      push("/");

      // data about user is automatically updated by context
      setAuthenticated(true);
    },
    [push, register, setAuthenticated]
  );

  return {
    user: data,
    authenticated,
    setUser: setData,
    login: loginHandler,
    logout: logoutHandler,
    register: registerHandler,
  };
};
