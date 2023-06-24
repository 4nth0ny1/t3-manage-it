import { api } from "../../utils/api";
import { TodoItem } from "./TodoItem";
import { CreateTodo } from "../../components/todos/CreateTodo";
import { ProgressBar } from "~/components/ProgressBar";

type ProjectIdProps = {
  sprintId: string;
};

export function TodoList({ sprintId }: ProjectIdProps) {
  const { data: sprint } = api.sprint.getOneSprint.useQuery({ sprintId });

  const { data: allTodos } = api.todo.getAllTodos.useQuery({ sprintId });

  const doneTodos = allTodos?.filter((todo) => {
    return todo.done;
  });
  const totalTodos = allTodos?.length as number;
  const doneTodosLength = doneTodos?.length as number;
  const percentDone = ((100 * doneTodosLength) / totalTodos).toFixed(0);

  let numberPercent: number = parseInt(percentDone);
  if (isNaN(numberPercent)) numberPercent = 0;

  const filteredList = allTodos?.filter((todo) => {
    return sprintId === todo.sprintId;
  });

  return (
    <div className="flex flex-row flex-wrap text-2xl">
      <div className="mb-10 flex w-full flex-row justify-between  px-20 py-10">
        <div className="flex flex-col">
          <h2 className="text-3xl">{sprint?.name}</h2>
          <div className="flex flex-row justify-center py-4">
            {filteredList && <ProgressBar percentDone={numberPercent} />}
          </div>
        </div>
        {filteredList && <CreateTodo />}
      </div>

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
