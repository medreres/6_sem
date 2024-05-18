import {useToast} from 'native-base';
import {useCallback, useEffect, useMemo} from 'react';
import {useForm} from 'react-hook-form';

import {AuthFormFields, FieldRule, UseLogin} from './types';
import {useLoginRequest} from './useLoginRequest';
import {useAuthContext} from '../context';
import {emailRegex} from '../utils';

export const useLogin: UseLogin = () => {
  const {login, loading} = useLoginRequest();
  const {setAuthenticated} = useAuthContext();
  const toast = useToast();

  const {
    handleSubmit,
    control,
    formState: {errors},
    setError,
    clearErrors,
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onChange',
  });

  const loginHandler = useCallback(
    async ({email, password}: AuthFormFields) => {
      try {
        const result = await login({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        if (result.data) {
          setAuthenticated(true);

          toast.show({
            description: 'Welcome to the Weather App!',
            color: 'green',
          });
        }
      } catch (error: any) {
        setError('root', {
          message: error.message,
        });
      }
    },
    [login, setAuthenticated, setError, toast],
  );

  const emailRule: FieldRule = useMemo(
    () => ({
      required: {
        message: 'Please enter email',
        value: true,
      },
      pattern: {
        value: emailRegex,
        message: 'Invalid email address',
      },
    }),
    [],
  );

  const passwordRule: FieldRule = useMemo(
    () => ({
      required: {
        message: 'Please enter password',
        value: true,
      },
      minLength: {
        message: 'Password length must be at least 6 symbols',
        value: 6,
      },
    }),
    [],
  );

  useEffect(() => {
    const cleanup = watch(() => clearErrors('root'));

    return () => cleanup.unsubscribe();
  }, [clearErrors, watch]);

  return {
    loginHandler: handleSubmit(loginHandler),
    control,
    errors,
    rules: {
      email: emailRule,
      password: passwordRule,
    },
    loading,
  };
};
