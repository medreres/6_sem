import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client';

import {AuthFormFields} from './authFormFields';
import {GeneralResponse} from '../../../../shared';
import {RegisterMutation} from '../../requests/types/register';

export type UseRegisterRequest = () => {
  register: (
    options?:
      | MutationFunctionOptions<
          RegisterMutation,
          AuthFormFields,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined,
  ) => Promise<
    FetchResult<{
      register: GeneralResponse;
    }>
  >;
  loading: boolean;
};
