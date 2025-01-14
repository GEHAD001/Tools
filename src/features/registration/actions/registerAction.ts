"use server";

import { convertZodErrors } from "@/utils/zodErrorParser";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { RegisterFormState } from "../types/types";
import { RegisterFormFieldsValidator } from "../schema/RegisterFormSchema";

export async function registerAction(
  pervState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const unValidateData = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    rePassword: formData.get("rePassword") as string,
  };

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // 1) [Parse & Validate]
  const validatedData = RegisterFormFieldsValidator.safeParse(unValidateData);

  if (!validatedData.success) {
    const errors = convertZodErrors(validatedData.error);
    return {
      data: unValidateData,
      errors,
    };
  }

  // 2) [Check User Exist]
  const user = await prisma.user.create({
    data: {
      username: validatedData.data.username,
      password: validatedData.data.password,
    },
  });

  // 3) [Successfully Then Redirect]
  return redirect(`/app?key=${user.id}`);
}
