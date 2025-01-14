import { AvatarDemo } from "@/components/Avatar";
import { BookCheck } from "lucide-react";

function Navbar() {
  return (
    <nav className="w-full px-8 py-4 flex justify-between items-center bg-slate-700 shadow-sm bg-[hsl(var(--primary))] text-stone-200">
      <div className="flex items-center gap-2">
        <BookCheck color="white" size={58} />
        <span className=" text-lg">Write</span>
      </div>

      <div className="flex items-center gap-2">
        <AvatarDemo />
        <p>Username</p>
      </div>
    </nav>
  );
}

export default Navbar;
