import {useToast} from 'native-base';
import {useCallback, useEffect, useMemo} from 'react';
import {useForm} from 'react-hook-form';

import {FieldRule, RegisterFormFields, UseRegister} from './types';
import {useRegisterRequest} from './useRegisterRequest';
import {useAuthContext} from '../context';
import {emailRegex} from '../utils';

export const useRegister: UseRegister = () => {
  const {setAuthenticated} = useAuthContext();
  const {register, loading} = useRegisterRequest();
  const toast = useToast();

  const {
    handleSubmit,
    control,
    formState: {errors},
    setError,
    clearErrors,
    watch,
  } = useForm<RegisterFormFields>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    reValidateMode: 'onChange',
  });

  const registerHandler = useCallback(
    async ({email, password}: RegisterFormFields) => {
      try {
        const result = await register({
          variables: {
            email,
            password,
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
    [register, setAuthenticated, setError, toast],
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

  const repeatPasswordRule: FieldRule = useMemo(
    () => ({
      required: {
        message: 'Please enter password',
        value: true,
      },
      minLength: {
        message: 'Password length must be at least 6 symbols',
        value: 6,
      },
      validate: (value, formValues) =>
        value === formValues.password || 'Password should match',
    }),
    [],
  );

  useEffect(() => {
    const cleanup = watch(() => clearErrors('root'));

    return () => cleanup.unsubscribe();
  }, [clearErrors, watch]);

  return {
    registerHandler: handleSubmit(registerHandler),
    control,
    errors,
    rules: {
      email: emailRule,
      password: passwordRule,
      repeatPassword: repeatPasswordRule,
    },
    loading,
  };
};
