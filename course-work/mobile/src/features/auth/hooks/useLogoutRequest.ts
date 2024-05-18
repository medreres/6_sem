import {useMutation} from '@apollo/client';

import {UseLogoutRequest} from './types';
import {LogoutMutation, logoutMutation} from '../requests';

export const useLogoutRequest: UseLogoutRequest = () => {
  const [logout] = useMutation<LogoutMutation>(logoutMutation, {
    fetchPolicy: 'no-cache',
  });

  return {
    logout,
  };
};
