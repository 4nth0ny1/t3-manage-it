import { api } from "../../utils/api";
import { TodoItem } from "./TodoItem";
import { CreateTodo } from "../../components/todos/CreateTodo";
import { ProgressBar } from "~/components/ProgressBar";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import { EditSprint } from "../sprints/EditSprint";

type ProjectIdProps = {
  sprintId: string;
};

export function TodoList({ sprintId }: ProjectIdProps) {
  const [editingSprint, setSprintEditing] = useState(false);

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
      <div className="mb-10 flex w-full flex-col justify-between  px-20 py-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="flex flex-row gap-4">
                <h2 className="text-4xl">{sprint?.name}</h2>
                {filteredList && (
                  <AiFillEdit
                    className="icon-color-edit text-2xl"
                    onClick={() => setSprintEditing(!editingSprint)}
                  />
                )}
                {editingSprint && (
                  <EditSprint
                    id={sprint?.id}
                    name={sprint?.name}
                    description={sprint?.description}
                    sprintId={sprintId}
                    onSprintEdit={() => setSprintEditing(!editingSprint)}
                  />
                )}
              </div>
              <p className="text-xl italic">{sprint?.description}</p>
            </div>
            {filteredList && (
              <div className="">
                <span className="italic">
                  {doneTodosLength}/{totalTodos} todos completed
                </span>
              </div>
            )}
          </div>
          <div className="py-4">
            {filteredList && <ProgressBar percentDone={numberPercent} />}
          </div>
        </div>
        {filteredList && (
          <div className="mt-4 flex flex-row justify-center">
            <CreateTodo />
          </div>
        )}
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
