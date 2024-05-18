import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUser } from "@/features";

import { LoginForm, UseLoginForm } from "./interfaces";
import { LoginFormSchema } from "./schemas";

export const useLoginForm: UseLoginForm = () => {
  const { login } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async ({ email, password }) => {
    try {
      await login({
        email,
        password,
      });
    } catch (error: any) {
      setError("root", { type: "custom", message: error.message });
    }
  };

  const loginHandler = handleSubmit(onSubmit);

  const emailRef = register("email");
  const passwordRef = register("password");

  return {
    errors,
    loginHandler,
    emailRef,
    passwordRef,
  };
};
