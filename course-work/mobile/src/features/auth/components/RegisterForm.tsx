import {
  Button,
  FormControl,
  Input,
  Stack,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import React, {FC} from 'react';
import {Controller} from 'react-hook-form';

import {useRegister} from '../hooks/useRegister';

export const RegisterForm: FC = () => {
  const {registerHandler, control, errors, rules, loading} = useRegister();

  return (
    <Stack className="justify-center items-center px-14 gap-3">
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormControl.Label>Email</FormControl.Label>
        <Controller
          name="email"
          control={control}
          rules={rules.email}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              size="2xl"
              textContentType="emailAddress"
              type="text"
              className="text-white"
              onBlur={onBlur}
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errors.email && errors.email.message}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.password)}>
        <FormControl.Label>Password</FormControl.Label>
        <Controller
          name="password"
          control={control}
          rules={rules.password}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              size="2xl"
              textContentType="password"
              type="password"
              className="text-white"
              onBlur={onBlur}
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errors.password && errors.password.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.repeatPassword)}>
        <FormControl.Label>Repeat Password</FormControl.Label>
        <Controller
          name="repeatPassword"
          control={control}
          rules={rules.repeatPassword}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              size="2xl"
              textContentType="password"
              type="password"
              className="text-white"
              onBlur={onBlur}
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errors.repeatPassword && errors.repeatPassword.message}
        </FormControl.ErrorMessage>
      </FormControl>

      {errors.root && <Text color="red.600">{errors.root.message}</Text>}

      <Button
        className="w-full"
        colorScheme="blue"
        isLoading={loading}
        disabled={Boolean(Object.keys(errors).length)}
        onPress={registerHandler}>
        Register
      </Button>
    </Stack>
  );
};
