import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import StickyNotesMain from "./layout/StickyNotesMain";

async function StickyNotesPage({
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
      <StickyNotesMain />
    </>
  );
}

export default StickyNotesPage;
