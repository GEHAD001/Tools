import { InsertTodoType } from "@/features/todo/types/TodoTypes";

export interface AddTodoFormState {
  data?: InsertTodoType;
  errors?: Partial<InsertTodoType> & { db?: "error" };
  successMsg?: string;
}
