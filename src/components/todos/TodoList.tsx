import { api } from "../../utils/api";
import { TodoItem } from "./TodoItem";
import { CreateTodo } from "../../components/todos/CreateTodo";

type ProjectIdProps = {
  sprintId: string;
};

export function TodoList({ sprintId }: ProjectIdProps) {
  const { data: sprint } = api.sprint.getOneSprint.useQuery({ sprintId });

  const { data: allTodos } = api.todo.getAllTodos.useQuery({ sprintId });

  const filteredList = allTodos?.filter((todo) => {
    return sprintId === todo.sprintId;
  });

  return (
    <div className="flex flex-row flex-wrap text-2xl">
      <div className="flex w-full flex-row justify-center p-10">
        <h2 className="text-3xl">{sprint?.name}</h2>
      </div>
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
