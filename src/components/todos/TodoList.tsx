import { api } from "../../utils/api";
import { TodoItem } from "./TodoItem";

type ProjectIdProps = {
  projectId: string;
};

export function TodoList({ projectId }: ProjectIdProps) {
  const {
    data: todosFromProject,
    isLoading,
    isError,
  } = api.todo.getAllTodosFromProject.useQuery({
    projectId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <ul className="flex flex-row flex-wrap text-2xl">
      {todosFromProject?.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}
