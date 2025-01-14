import { DatePicker } from "@/components/DatePicker";
import AddTodo from "@/features/todo/components/AddTodo";

function TodoSidebar() {
  return (
    <div className="w-1/4 sticky top-2 self-start flex flex-col gap-4">
      <div className="rounded-lg border-2 border-black p-4">
        <AddTodo />
      </div>
      <div className="rounded-lg border-2 border-black ">
        <DatePicker />
      </div>
    </div>
  );
}

export default TodoSidebar;
