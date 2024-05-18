import {Dispatch} from 'react';

import {User} from '../../../user/types';

export interface AuthState {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  authenticated: boolean;
  setAuthenticated: Dispatch<React.SetStateAction<boolean>>;

  loading: boolean;
}
