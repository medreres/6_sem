import { useLazyQuery } from "@apollo/client";

import { ME, MeResponse } from "../requests";

import { UseMe } from "./interfaces";

export const useMe: UseMe = () => {
  const [me] = useLazyQuery<{ me: MeResponse }>(ME, { fetchPolicy: "no-cache" });

  return {
    me,
  };
};
