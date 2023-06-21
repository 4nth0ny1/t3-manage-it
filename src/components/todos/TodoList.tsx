import { api } from "../../utils/api";
import { TodoItem } from "./TodoItem";
import { CreateTodo } from "../../components/todos/CreateTodo";

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
      <div className="flex w-full flex-row justify-center p-4">
        <CreateTodo />
      </div>
      {todosFromProject?.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}
