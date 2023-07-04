import { api } from "../../utils/api";
import { TodoItem } from "./TodoItem";
import { CreateTodo } from "../../components/todos/CreateTodo";
import { ProgressBar } from "~/components/ProgressBar";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import { EditSprint } from "../sprints/EditSprint";
import { BsBackspace } from "react-icons/bs";
import { ProgressBarLine } from "../ProgressBarLine";

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
      <ProgressBarLine percentDone={numberPercent} />
      <div className="mt-6 flex w-full flex-col justify-between px-20">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="flex flex-row gap-12">
                {filteredList && (
                  <div className="flex flex-row gap-12">
                    <div>
                      <h2 className="text-4xl">{sprint?.name}</h2>
                      <p className="text-xl italic">{sprint?.description}</p>
                    </div>
                    {!editingSprint && (
                      <AiFillEdit
                        className="icon-color-edit text-2xl"
                        onClick={() => setSprintEditing(!editingSprint)}
                      />
                    )}
                  </div>
                )}
                {editingSprint && (
                  <div>
                    <BsBackspace
                      className="icon-color-delete text-2xl"
                      onClick={() => setSprintEditing(!editingSprint)}
                    />
                    <EditSprint
                      id={sprint?.id as string}
                      name={sprint?.name}
                      description={sprint?.description}
                      sprintId={sprintId}
                      onSprintEdit={() => setSprintEditing(!editingSprint)}
                    />
                  </div>
                )}
              </div>
            </div>
            {filteredList && (
              <div className="text-center">
                <span className="italic">
                  {doneTodosLength}/{totalTodos} todos completed
                </span>
                {/* <div className="py-4">
                  {filteredList && <ProgressBar percentDone={numberPercent} />}
                </div> */}
              </div>
            )}
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
