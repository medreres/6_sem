import { BaseSyntheticEvent } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { z } from "zod";

import { LoginFormSchema } from "../schemas";

export type LoginForm = z.infer<typeof LoginFormSchema>;

export type UseLoginForm = () => {
  errors: FieldErrors<{
    email: string;
    password: string;
  }>;

  loginHandler: (_e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;

  emailRef: UseFormRegisterReturn<"email">;

  passwordRef: UseFormRegisterReturn<"password">;
};
