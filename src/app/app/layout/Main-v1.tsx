"use client";

import { isSameDay } from "date-fns";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent } from "react";
import { TodoType } from "@/features/todo/types/TodoTypes";
import { useTodoContext } from "@/features/todo/context/TodoContext";

function Main() {
  const { date, isLoadingTodos, todos } = useTodoContext();

  if (isLoadingTodos) return <p>Loading</p>;

  const todosSelectedDate = todos.filter((todo: TodoType) =>
    isSameDay(todo.date, date)
  );

  const completedTodo = todosSelectedDate.filter(
    (todo: TodoType) => todo.isComplete
  );
  const unCompletedTodo = todosSelectedDate.filter(
    (todo: TodoType) => todo.isComplete === false
  );

  async function handleOnCheck(
    e: ChangeEvent<HTMLInputElement>,
    todo: TodoType
  ) {}

  return (
    <main className="w-3/4 p-6 min-h-svh flex flex-col gap-2 border-l-2 border-t-2 border-r-4 border-b-4  border-black rounded-lg">
      <h2>Date: {`${date.toLocaleDateString()}`}</h2>

      {unCompletedTodo.map((todo) => (
        <div className="flex gap-4" key={todo.id}>
          <input
            type="checkbox"
            checked={todo.isComplete}
            className="w-5"
            onChange={(e) => handleOnCheck(e, todo)}
          />
          <Label className="text-lg line-clamp-2  ">{todo.task}</Label>
        </div>
      ))}

      <div className="w-full h-[2px] bg-gray-300"></div>

      {completedTodo.map((todo) => (
        <div className="flex gap-4" key={todo.id}>
          <input
            type="checkbox"
            checked={todo.isComplete}
            className="w-5"
            onChange={(e) => handleOnCheck(e, todo)}
          />
          <Label className="text-lg line-through line-clamp-2 text-gray-500">
            {todo.task}
          </Label>
        </div>
      ))}
    </main>
  );
}

export default Main;
