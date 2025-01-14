import { z } from "zod";

export const RegisterFormFieldsValidator = z
  .object({
    username: z
      .string()
      .min(4, "should be more than 3 characters")
      .max(20, "should be less then 21 characters"),

    password: z
      .string()
      .min(4, "should be more than 3 characters")
      .max(20, "should be less then 21 characters"),
    rePassword: z
      .string()
      .min(4, "should be more than 3 characters")
      .max(20, "should be less then 21 characters"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"], // Highlights the rePassword field in error messages
  });

export type RegisterFormFieldsType = z.infer<
  typeof RegisterFormFieldsValidator
>;
