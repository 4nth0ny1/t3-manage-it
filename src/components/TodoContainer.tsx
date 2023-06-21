import { TodoList } from "../components/todos/TodoList";

type SprintIdProps = {
  sprintId: string;
};

export function TodoContainer({ sprintId }: SprintIdProps) {
  return (
    <div className="min-h-screen w-4/5 border-l-2 p-4">
      <h2 className="text-2xl">TodoContainer</h2>
      <TodoList sprintId={sprintId} />
    </div>
  );
}
