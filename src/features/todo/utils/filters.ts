"use client";

import { isSameDay } from "date-fns";
import { TodoType } from "../types/TodoTypes";

export const getTodosByDate = ({
  todos,
  date,
}: {
  todos: TodoType[];
  date: Date;
}) => todos.filter((todo: TodoType) => isSameDay(todo.date, date));

export const getCompletedTodo = (todos: TodoType[]) =>
  todos.filter((todo: TodoType) => todo.isComplete);

export const getUnCompletedTodo = (todos: TodoType[]) =>
  todos.filter((todo: TodoType) => todo.isComplete === false);
