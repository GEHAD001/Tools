import Navbar from "@/app/app/layout/Navbar";
import { ReactNode } from "react";

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen max-h-fit">
      <Navbar />
      {children}
    </div>
  );
}

export default AppLayout;
