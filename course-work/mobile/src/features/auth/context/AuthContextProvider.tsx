import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {initialState} from './initialState';
import {AuthState} from './types';
import {User} from '../../user/types';
import {useMeRequest} from '../hooks/useMeRequest';

export const AuthContext = createContext(initialState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC<PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const {me} = useMeRequest();

  useEffect(() => {
    if (!authenticated) {
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      let data: User | null = null;
      let isAuthenticated = false;

      const response = await me();

      if (response.data) {
        data = response.data.me;
        isAuthenticated = true;
      }

      if (response.error) {
        data = null;
        isAuthenticated = false;
      }

      setUser(data);
      setAuthenticated(isAuthenticated);

      setLoading(false);
    };

    fetchUser();
  }, [authenticated, me]);

  const contextValue: AuthState = {
    user,
    setUser,

    authenticated,
    setAuthenticated,

    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
