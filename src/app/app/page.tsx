import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import Main from "./layout/Main";
import Sidebar from "./layout/Sidebar";
import { TodoProvider } from "@/features/todo/context/TodoContext";

async function AppPage({
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
          <Main />
          <Sidebar />
        </section>
      </TodoProvider>
    </>
  );
}

export default AppPage;
