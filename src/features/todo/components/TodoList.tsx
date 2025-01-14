"use client";

import { TodoType, UpdateTodoType } from "../types/TodoTypes";
import { Input } from "@/components/ui/input";
import useUpdateTodo from "../hooks/useUpdateTodo";
import clsx from "clsx";
import { Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import useDeleteTodo from "../hooks/useDeleteTodo";
import { FocusEvent, KeyboardEvent, useRef } from "react";

function TodoList({ todos }: { todos: TodoType[] }) {
  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
}

function TodoItem({ todo }: { todo: TodoType }) {
  const { updateTodo, isPending: isUpdating } = useUpdateTodo();
  const { deleteTodo, isPending: isDeleting } = useDeleteTodo();
  const input = useRef<HTMLInputElement | null>(null);

  function onUpdate(todo: UpdateTodoType) {
    console.log(todo);
    console.log(todo);
    updateTodo(todo);
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        type="checkbox"
        checked={todo.isComplete}
        onChange={() => onUpdate({ ...todo, isComplete: !todo.isComplete })}
        disabled={isUpdating || isDeleting}
        className={clsx("w-fit", {
          "line-through text-gray-400": todo.isComplete,
        })}
      />

      <Input
        type="text"
        defaultValue={todo.task}
        onBlur={(e: FocusEvent<HTMLInputElement, Element>) => {
          return (
            todo.task !== e.target.value &&
            updateTodo({ ...todo, task: e.target.value })
          );
        }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.code === "Enter") {
            input.current?.blur();
          }
        }}
        className={clsx(
          "border-none shadow-none line-clamp-2 ring-1 ring-blue-500/20 focus:ring-2 focus:ring-blue-500/50 hover:ring-blue-500 focus:outline-none focus:ring-blue-500 ",
          {
            "line-through text-gray-400": todo.isComplete,
          }
        )}
        ref={input}
      />

      <div className="grow"></div>
      <div>
        <Button
          onClick={() => deleteTodo({ id: todo.id, userId: todo.userId })}
          disabled={isUpdating || isDeleting}
        >
          <Delete />
        </Button>
      </div>
    </div>
  );
}

export default TodoList;
