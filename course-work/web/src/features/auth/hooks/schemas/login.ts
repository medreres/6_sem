import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, {
      message: "Password length must be greater than 5 characters",
    })
    .max(65, {
      message: "Password length must be lesser than 64 characters",
    }),
});
