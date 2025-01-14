"use server";

import { convertZodErrors } from "@/utils/zodErrorParser";
import { AddTodoFormFieldsValidator } from "../schemas/todoSchema";
import { AddTodoFormState } from "../types/AddTodoFormState";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { InsertTodoType } from "../types/TodoTypes";

async function createTodoJob(data: InsertTodoType) {
  const todo = await prisma.todo.create({
    data: {
      task: data.task,
      date: data.date,
      user: {
        connect: {
          id: data.userId,
        },
      },
    },
  });

  return todo;
}

export async function addTodoAction(
  pervState: AddTodoFormState,
  formData: FormData
): Promise<AddTodoFormState> {
  const unValidatedData = {
    userId: formData.get("userId") as string,
    task: formData.get("task") as string,
    date: new Date(formData.get("date") as string),
  };

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // 1) Parse & Validate
  const validatedData = await AddTodoFormFieldsValidator.safeParseAsync(
    unValidatedData
  );

  if (!validatedData.success) {
    const errors = convertZodErrors(validatedData.error);
    return {
      data: unValidatedData,
      errors,
    };
  }

  // 2) Insert & Check
  const todo = await createTodoJob(validatedData.data);
  if (!todo) {
    return {
      data: validatedData.data,
      errors: { db: "error" },
    };
  }

  // const todos = await fetchTodos({ userId: validatedData.data.userId });

  // 3) return Success

  revalidatePath("/");

  return {
    successMsg: "todo has been add it successfully",
  };
}
