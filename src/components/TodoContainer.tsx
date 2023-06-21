import { TodoList } from "../components/todos/TodoList";

type ProjectIdProps = {
  projectId: string;
};

export function TodoContainer({ projectId }: ProjectIdProps) {
  return (
    <div className="min-h-screen w-4/5 border-l-2 p-4">
      <TodoList projectId={projectId} />
    </div>
  );
}
