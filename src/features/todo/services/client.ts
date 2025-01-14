"use client";

import {
  DeleteTodoType,
  InsertTodoType,
  UpdateTodoType,
} from "../types/TodoTypes";

export async function fetchTodos(key: string) {
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await fetch(`http://localhost:3000/api/todo?key=${key}`).then(
    (res) => res.json()
  );

  return data;
}

export async function createTodoAPI(newTodo: InsertTodoType) {
  const data = await fetch(
    `http://localhost:3000/api/todo?key=${newTodo.userId}`,
    { method: "POST", body: JSON.stringify(newTodo) }
  ).then((res) => res.json());

  return data;
}

export async function updateTodoAPI(updatedTodo: UpdateTodoType) {
  const data = await fetch(
    `http://localhost:3000/api/todo?key=${updatedTodo.userId}`,
    { method: "PATCH", body: JSON.stringify(updatedTodo) }
  ).then((res) => res.json());

  return data;
}

export async function deleteTodoAPI(deletedTodo: DeleteTodoType) {
  const data = await fetch(
    `http://localhost:3000/api/todo?key=${deletedTodo.userId}`,
    {
      method: "DELETE",
      body: JSON.stringify(deletedTodo),
    }
  ).then((res) => res.json());

  return data;
}
