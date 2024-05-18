import {useMutation} from '@apollo/client';

import {UseLoginRequest} from './types';
import {LoginMutation, loginMutation} from '../requests';

export const useLoginRequest: UseLoginRequest = () => {
  const [login, {loading}] = useMutation<LoginMutation>(loginMutation, {
    fetchPolicy: 'no-cache',
  });

  return {
    login,
    loading,
  };
};
