"use client";
import { createContext, use, useState } from "react";
import { TodoType } from "../types/TodoTypes";
import { useSearchParams } from "next/navigation";
import useTodos from "../hooks/useTodos";

interface TodoContextValue {
  date: Date;
  todos: TodoType[];
  isLoadingTodos: boolean;
  setDate: (date: Date) => void;
}

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const key = useSearchParams().get("key") ?? "";
  const [date, setDate] = useState<Date>(new Date());
  const { isLoadingTodos, todos } = useTodos(key);

  return (
    <TodoContext.Provider value={{ todos, isLoadingTodos, date, setDate }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = use(TodoContext);
  if (!context)
    throw new Error("You are using TodoContext outside TodoProvider");

  return context;
}
