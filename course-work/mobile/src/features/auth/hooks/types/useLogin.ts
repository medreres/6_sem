import {Control, FieldErrors} from 'react-hook-form';

import {AuthFormFields} from './authFormFields';
import {FieldRule} from './shared';

export type UseLoginResponse = {
  loginHandler: (
    _e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined,
  ) => Promise<void>;
  control: Control<AuthFormFields, unknown>;
  errors: FieldErrors<AuthFormFields>;

  rules: {[Property in keyof AuthFormFields]: FieldRule<Property>};

  loading: boolean;
};

export type UseLogin = () => UseLoginResponse;
