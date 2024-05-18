import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUser } from "@/features";

import { RegisterForm, UseRegisterForm } from "./interfaces";
import { RegisterFormSchema } from "./schemas";

export const useRegisterForm: UseRegisterForm = () => {
  const { register: registerUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = useCallback(
    async ({ email, password }) => {
      try {
        await registerUser({
          email,
          password,
        });
      } catch (error: any) {
        setError("root", {
          type: "custom",
          message: error.message,
        });
      }
    },
    [registerUser, setError]
  );

  const registerHandler = handleSubmit(onSubmit);

  const emailRef = register("email");
  const passwordRef = register("password");
  const confirmPasswordRef = register("confirmPassword");

  return {
    errors,
    registerHandler,
    emailRef,
    passwordRef,
    confirmPasswordRef,
  };
};
