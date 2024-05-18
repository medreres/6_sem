import { LazyQueryExecFunction, OperationVariables } from "@apollo/client";

import { MeResponse } from "../../requests";

export type UseMe = () => {
  me: LazyQueryExecFunction<
    {
      me: MeResponse;
    },
    OperationVariables
  >;
};
