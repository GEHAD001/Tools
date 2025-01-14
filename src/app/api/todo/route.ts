import {
  DeleteTodoType,
  UpdateTodoType,
} from "@/features/todo/types/TodoTypes";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get("key") ?? "";

  const todos = await prisma.todo.findMany({
    where: {
      userId: key,
    },
    orderBy: {
      date: "desc",
    },
  });

  return Response.json(todos);
}

// TODO: NEED Look
export async function POST(request: NextRequest) {
  const { userId, task } = await request.json();

  const todo = await prisma.todo.create({
    data: {
      userId,
      task,
      date: new Date(),
    },
  });

  // revalidatePath(`/app`);

  return Response.json(todo);
}

export async function PATCH(request: NextRequest) {
  const { id, task, isComplete }: UpdateTodoType = await request.json();

  const updatedTodo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      task,
      isComplete,
    },
  });

  revalidatePath(`/app`);

  return Response.json(updatedTodo);
}

export async function DELETE(request: NextRequest) {
  const { id }: DeleteTodoType = await request.json();

  const data = await prisma.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/app");

  return Response.json(data);
}
