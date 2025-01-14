"use client";
import { useTodoContext } from "@/features/todo/context/TodoContext";
import {
  getCompletedTodo,
  getTodosByDate,
  getUnCompletedTodo,
} from "@/features/todo/utils/filters";
import TodoList from "@/features/todo/components/TodoList";

function Main() {
  const { date, todos, isLoadingTodos } = useTodoContext();

  if (isLoadingTodos)
    return (
      <p className="w-3/4 p-6 min-h-svh flex flex-col justify-center items-center gap-2 border-l-2 border-t-2 border-r-4 border-b-4  border-black rounded-lg ">
        Loading...
      </p>
    );

  const todosSelectedDate = getTodosByDate({ todos, date });
  const completedTodo = getCompletedTodo(todosSelectedDate);
  const unCompletedTodo = getUnCompletedTodo(todosSelectedDate);

  return (
    <main className="w-3/4 p-6 min-h-svh flex flex-col gap-2 border-l-2 border-t-2 border-r-4 border-b-4  border-black rounded-lg">
      <h2>Date: {`${date.toLocaleDateString()}`}</h2>

      <TodoList todos={unCompletedTodo} />
      <div className="w-full h-[2px] bg-gray-300"></div>

      <TodoList todos={completedTodo} />
    </main>
  );
}

export default Main;
