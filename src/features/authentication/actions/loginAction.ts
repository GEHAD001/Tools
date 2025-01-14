"use server";

import { convertZodErrors } from "@/utils/zodErrorParser";
import { LoginFormFieldsValidator } from "../schema/LoginFormSchema";
import { LoginFormState } from "../types/types";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function loginAction(
  pervState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const unValidateData = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // 1) [Parse & Validate]
  const validatedData = LoginFormFieldsValidator.safeParse(unValidateData);

  if (!validatedData.success) {
    const errors = convertZodErrors(validatedData.error);
    return {
      data: unValidateData,
      errors,
    };
  }

  // 2) [Check User Exist]
  const user = await prisma.user.findFirst({
    where: {
      username: validatedData.data.username,
      password: validatedData.data.password,
    },
  });

  if (!user)
    return {
      data: validatedData.data,
      errors: { credentialsError: "username or password are wrong" },
    };

  // 3) [Successfully Then Redirect]
  return redirect(`/app/todo?key=${user.id}`);
}
