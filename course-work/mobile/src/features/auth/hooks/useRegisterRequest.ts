import {useMutation} from '@apollo/client';

import {AuthFormFields} from './types';
import {UseRegisterRequest} from './types/useRegisterRequest';
import {REGISTER} from '../requests';
import {RegisterMutation} from '../requests/types/register';

export const useRegisterRequest: UseRegisterRequest = () => {
  const [register, {loading}] = useMutation<RegisterMutation, AuthFormFields>(
    REGISTER,
    {
      fetchPolicy: 'no-cache',
    },
  );

  return {
    register,
    loading,
  };
};
