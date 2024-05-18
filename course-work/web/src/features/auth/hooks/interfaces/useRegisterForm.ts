import { BaseSyntheticEvent } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { z } from "zod";

import { RegisterFormSchema } from "../schemas";

export type RegisterForm = z.infer<typeof RegisterFormSchema>;

export type UseRegisterForm = () => {
  errors: FieldErrors<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  registerHandler: (_e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  emailRef: UseFormRegisterReturn<"email">;
  passwordRef: UseFormRegisterReturn<"password">;
  confirmPasswordRef: UseFormRegisterReturn<"confirmPassword">;
};
