import { useMutation } from "@apollo/client";

import { useHistoryContext } from "@/features/history";

import { LOGIN, LOGOUT, REGISTER } from "../requests";

export const useUserRequests = () => {
  const { addHistory } = useHistoryContext();

  const [login] = useMutation(LOGIN, { fetchPolicy: "no-cache" });
  const [logout] = useMutation(LOGOUT, { fetchPolicy: "no-cache" });
  const [register] = useMutation(REGISTER, { fetchPolicy: "no-cache" });

  const handleLogout = async () => {
    await logout();

    addHistory({
      message: "Logged out successfully!",
      severity: "info",
    });
  };

  return {
    login,
    register,
    logout: handleLogout,
  };
};
