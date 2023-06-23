import { api } from "../../utils/api";
import { TodoItem } from "./TodoItem";
import { CreateTodo } from "../../components/todos/CreateTodo";
import type { Todo } from "../../types";

type ProjectIdProps = {
  sprintId: string;
  projectId: string;
};

export function TodoList({ sprintId, projectId }: ProjectIdProps) {
  const {
    data: allTodos,
    isLoading,
    isError,
  } = api.todo.getAllTodos.useQuery({ sprintId });
  //teest
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Something went wrong</div>;

  const filteredList = allTodos?.filter((todo) => {
    return sprintId === todo.sprintId;
  });

  return (
    <div className="flex flex-row flex-wrap text-2xl">
      {filteredList && (
        <div className="mb-6 flex w-full flex-row justify-center p-4">
          <CreateTodo />
        </div>
      )}
      {filteredList ? (
        filteredList?.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })
      ) : (
        <div className="align-center flex w-full flex-row justify-center p-24">
          <div className="flex flex-col justify-center">Choose a Sprint</div>
        </div>
      )}
    </div>
  );
}
