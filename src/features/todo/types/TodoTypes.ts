// NOTE: One Type Contain the Entire Schema & then Create Sub-Types based on Requirement.

export interface TodoType {
  id: string;
  task: string;
  isComplete: boolean;
  date: Date;
  userId: string;
}

export type InsertTodoType = Omit<TodoType, "id" | "isComplete">;

export type UpdateTodoType = Pick<TodoType, "id" | "userId"> &
  Partial<Pick<TodoType, "task" | "isComplete">>;

export type DeleteTodoType = Pick<TodoType, "id" | "userId">;
