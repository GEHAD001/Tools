import { z } from "zod";

export const AddTodoFormFieldsValidator = z.object({
  userId: z.string(),
  task: z.string().min(1, "Should at least contain 2 characters"),
  date: z.date().default(new Date()),
});
