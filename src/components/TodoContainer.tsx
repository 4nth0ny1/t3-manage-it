import { TodoList } from "../components/todos/TodoList";

type SprintIdProps = {
  sprintId: string;
};

export function TodoContainer({ sprintId }: SprintIdProps) {
  return (
    <div className="border-right-200 min-h-screen w-4/5 bg-green-200">
      TodoContainer
      <TodoList sprintId={sprintId} />
    </div>
  );
}
