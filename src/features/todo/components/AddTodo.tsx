"use client";

import { useActionState, useEffect, useRef } from "react";

import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { ListTodo } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddTodoFormState } from "../types/AddTodoFormState";
import { useTodoContext } from "../context/TodoContext";
import { addTodoAction } from "../actions/actions";
import { useQueryClient } from "@tanstack/react-query";

const initialState: AddTodoFormState = {};

function AddTodo() {
  const { date } = useTodoContext();
  const { toast: SuccessToast } = useToast();
  const queryClient = useQueryClient();
  const formRef: { current: HTMLFormElement | null } =
    useRef<HTMLFormElement | null>(null);

  const [formState, addTodo, isPending] = useActionState(
    addTodoAction,
    initialState
  );

  useEffect(
    function () {
      if (formState.successMsg) {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        SuccessToast({
          title: formState.successMsg,
          description: formState.data?.task,
        });

        // NOTE: If not clear `successMsg` then, the next todo will not fetched because `successMsg` Still the Same, also Toast not Trigger.
        formState.successMsg = "";
      }
    },
    [formState, formState.successMsg, queryClient, formState.data, SuccessToast]
  );

  const key = useSearchParams().get("key") ?? "";

  return (
    <form action={addTodo} className="flex flex-col gap-2" ref={formRef}>
      <Label htmlFor="task" className="flex gap-1 items-center">
        <ListTodo size={20} /> Add Task
      </Label>
      <Input
        id="task"
        name="task"
        type="text"
        minLength={1}
        maxLength={50}
        placeholder="Enter Task..."
        className={clsx(
          "todo-input placeholder:text-sm placeholder:text-gray-400",
          {
            "border-2 border-red-500": formState.errors?.task,
          }
        )}
      />
      <small className="text-red-500">{formState.errors?.task}</small>
      <input name="date" defaultValue={`${date}`} hidden />
      <input type="text" name="userId" defaultValue={key} hidden />
      <Button
        type="submit"
        className="mt-4"
        onClick={() => setTimeout(() => formRef.current?.reset(), 0)}
      >
        Add
      </Button>

      {isPending && (
        <div
          className="w-full h-9 mt-4  rounded-lg flex justify-center items-center
        text-sm text-gray-500
      "
        >
          Todos in Processing ...
        </div>
      )}
    </form>
  );
}

export default AddTodo;
