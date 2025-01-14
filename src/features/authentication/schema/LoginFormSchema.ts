import { z } from "zod";

export const LoginFormFieldsValidator = z.object({
  username: z
    .string()
    .min(4, "should be more than 3 characters")
    .max(20, "should be less then 21 characters"),

  password: z
    .string()
    .min(4, "should be more than 3 characters")
    .max(20, "should be less then 21 characters"),
});

export type LoginFormFieldsType = z.infer<typeof LoginFormFieldsValidator>;
