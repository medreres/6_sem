import {Alert} from 'react-native';

import {UseLogout} from './types';
import {useLogoutRequest} from './useLogoutRequest';
import {useAuthContext} from '../context';

export const useLogout: UseLogout = () => {
  const {logout} = useLogoutRequest();
  const {setAuthenticated} = useAuthContext();

  const logoutHandler = async () => {
    const response = await logout();

    if (response.errors) {
      response.errors.forEach(error => Alert.alert(error.message));
    }

    if (response.data) {
      setAuthenticated(false);
    }
  };

  return {
    logoutHandler: logoutHandler,
  };
};
