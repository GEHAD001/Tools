"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteTodoType } from "../types/TodoTypes";
import { deleteTodoAPI } from "../services/client";

function useDeleteTodo() {
  const queryClient = useQueryClient();

  const { mutate: deleteTodo, isPending } = useMutation({
    mutationFn: (deletedTodo: DeleteTodoType) => deleteTodoAPI(deletedTodo),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return { deleteTodo, isPending };
}

export default useDeleteTodo;
