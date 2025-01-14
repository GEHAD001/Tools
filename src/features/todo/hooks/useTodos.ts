"use client";

import { TodoType } from "@/features/todo/types/TodoTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../services/client";

interface useTodosType {
  todos: TodoType[];
  isLoadingTodos: boolean;
  isErrorTodos: boolean;
  error: Error | null;
}

function useTodos(userKey: string): useTodosType {
  const {
    isPending: isLoadingTodos,
    isError: isErrorTodos,
    data: todos,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(userKey),
  });
  return { isLoadingTodos, isErrorTodos, todos, error };
}

export default useTodos;
