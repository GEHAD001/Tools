"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateTodoType } from "../types/TodoTypes";
import { updateTodoAPI } from "../services/client";

function useUpdateTodo() {
  const queryClient = useQueryClient();
  const { mutate: updateTodo, isPending } = useMutation({
    mutationFn: (todo: UpdateTodoType) => {
      return updateTodoAPI(todo);
    },

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return { updateTodo, isPending };
}

export default useUpdateTodo;
