import { useMutation } from "@tanstack/react-query";
import { createTodoAPI } from "../services/client";

function useCreateTodo() {
  //   const queryClient = useQueryClient();

  const {
    mutate: mutateTodo,
    isPending,
    isError,
  } = useMutation({
    mutationFn: createTodoAPI,
  });

  return { mutateTodo, isPending, isError };
}

export default useCreateTodo;
