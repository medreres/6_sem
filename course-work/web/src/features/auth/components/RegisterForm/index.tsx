import { FC } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";

import { useRegisterForm } from "../../hooks";

export const RegisterForm: FC = () => {
  const { errors, passwordRef, emailRef, registerHandler, confirmPasswordRef } = useRegisterForm();

  return (
    <form onSubmit={registerHandler}>
      <Stack spacing={2}>
        <TextField
          {...emailRef}
          error={!!errors.email}
          helperText={errors.email?.message}
          id="email-input"
          label="Email"
          type="email"
          autoComplete="email"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          {...passwordRef}
          error={!!errors.password}
          helperText={errors.password?.message}
          id="password-input"
          label="Password"
          type="password"
          autoComplete="new-password"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          {...confirmPasswordRef}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          id="confirm-password-input"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />

        {errors.root && (
          <Typography
            variant="caption"
            color="error.main">
            {errors.root.message}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained">
          Sign up
        </Button>
      </Stack>
    </form>
  );
};
