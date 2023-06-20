import { api } from "../../utils/api";
import { TodoItem } from "./TodoItem";

type SprintIdProps = {
  sprintId: string;
};

export function TodoList({ sprintId }: SprintIdProps) {
  const {
    data: todos,
    isLoading,
    isError,
  } = api.todo.getAllTodos.useQuery({ sprintId });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <ul className="flex flex-row flex-wrap text-2xl">
      {todos?.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}
