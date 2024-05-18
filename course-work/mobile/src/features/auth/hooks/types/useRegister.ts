import {Control, FieldErrors} from 'react-hook-form';

import {RegisterFormFields} from './RegisterFormFields';
import {FieldRule} from './shared';

export type UseRegisterResponse = {
  registerHandler: (
    _e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined,
  ) => Promise<void>;
  control: Control<RegisterFormFields, unknown>;
  errors: FieldErrors<RegisterFormFields>;

  rules: {[Property in keyof RegisterFormFields]: FieldRule<Property>};

  loading: boolean;
};

export type UseRegister = () => UseRegisterResponse;
