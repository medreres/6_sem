import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client';

import {LoginMutation} from '../../requests';

export type UseLoginRequest = () => {
  login: (
    _options?:
      | MutationFunctionOptions<
          LoginMutation,
          OperationVariables,
          DefaultContext,
          ApolloCache<unknown>
        >
      | undefined,
  ) => Promise<
    FetchResult<LoginMutation, Record<string, unknown>, Record<string, unknown>>
  >;
  loading: boolean;
};
