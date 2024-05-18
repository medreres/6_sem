import {useLazyQuery} from '@apollo/client';

import {UseMeRequest} from './types';
import {Me, meQuery} from '../requests';

export const useMeRequest: UseMeRequest = () => {
  const [me] = useLazyQuery<Me>(meQuery, {
    fetchPolicy: 'no-cache',
  });

  return {
    me,
  };
};
