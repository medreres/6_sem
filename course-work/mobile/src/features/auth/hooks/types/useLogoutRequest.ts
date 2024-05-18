import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client';

import {LogoutMutation} from '../../requests';

export type UseLogoutRequest = () => {
  logout: (
    _options?:
      | MutationFunctionOptions<
          LogoutMutation,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined,
  ) => Promise<
    FetchResult<LogoutMutation, Record<string, any>, Record<string, any>>
  >;
};
