import { TodoList } from "../components/todos/TodoList";

export function TodoContainer() {
  return (
    <div className="min-h-screen w-4/5 border-l-2 p-4">
      <TodoList />
    </div>
  );
}
