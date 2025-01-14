import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import { TodoProvider } from "@/features/todo/context/TodoContext";
import TodoMain from "./layout/TodoMain";
import TodoSidebar from "./layout/TodoSidebar";

async function TodoPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  if (!key) redirect("/login");

  const user = await prisma.user.findFirst({
    where: {
      id: key,
    },
  });

  if (!user) redirect("/login");

  return (
    <>
      <TodoProvider>
        <section className="w-full p-6 flex gap-2 ">
          <TodoMain />
          <TodoSidebar />
        </section>
      </TodoProvider>
    </>
  );
}

export default TodoPage;
