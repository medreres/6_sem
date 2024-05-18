import { FC, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";

import { useLoginForm } from "../../hooks";

export const LoginForm: FC = () => {
  const { errors, passwordRef, emailRef, loginHandler } = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={loginHandler}>
      <Stack spacing={2}>
        <TextField
          error={!!errors.email}
          helperText={errors.email?.message}
          autoComplete="off"
          {...emailRef}
          id="email-input"
          label="Email"
          type="email"
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
          error={!!errors.password}
          helperText={errors.password?.message}
          autoComplete="true"
          id="password-input"
          {...passwordRef}
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
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
          sx={{
            mt: 2,
          }}
          type="submit"
          variant="contained">
          Sign In
        </Button>
      </Stack>
    </form>
  );
};
