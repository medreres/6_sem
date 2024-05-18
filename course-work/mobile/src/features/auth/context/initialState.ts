import {AuthState} from './types';

export const initialState: AuthState = {
  user: null,
  setUser: () => null,

  authenticated: true,
  setAuthenticated: () => null,

  loading: true,
};
