import { api } from "../../utils/api";
import { TodoItem } from "./TodoItem";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import { EditSprintModal } from "../sprints/EditSprintModal";
import { ProgressBarLine } from "../ProgressBarLine";
import CreateTodoModal from "./CreateTodoModal";
import toast, { Toaster } from "react-hot-toast";
import { AiFillMinusCircle } from "react-icons/ai";

type ProjectIdProps = {
  sprintId: string;
};

export function TodoList({ sprintId }: ProjectIdProps) {
  const [editingSprint, setSprintEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

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

  const resetModal = () => {
    setOpenModal(false);
    toast.success("Todo created 🎉");
  };

  return (
    <>
      {openModal || openEditModal ? (
        <div>
          {openModal && (
            <div className=" text-white">
              <button
                className="text-3xl text-secondary"
                onClick={() => setOpenModal(!openModal)}
              >
                <AiFillMinusCircle />
              </button>
              <CreateTodoModal resetModal={resetModal} />
            </div>
          )}
          {openEditModal && (
            <div className=" text-white">
              <button
                className="text-3xl text-secondary"
                onClick={() => setOpenEditModal(!openEditModal)}
              >
                <AiFillMinusCircle />
              </button>
              <EditSprintModal
                id={sprint?.id as string}
                name={sprint?.name}
                description={sprint?.description}
                sprintId={sprintId}
                onSprintEdit={() => setOpenEditModal(!openEditModal)}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 flex flex-row flex-wrap text-2xl md:mt-0">
          <ProgressBarLine percentDone={numberPercent} />

          <div className="mt-6 flex w-full flex-col justify-between md:px-20">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-row gap-12">
                    {filteredList && (
                      <div className="flex flex-row gap-12">
                        <div>
                          <h2 className="text-4xl">{sprint?.name}</h2>
                          <p className="text-xl italic">
                            {sprint?.description}
                          </p>
                        </div>
                        {!editingSprint && (
                          <AiFillEdit
                            className="icon-color-edit text-2xl"
                            onClick={() => setOpenEditModal(!openEditModal)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {filteredList && (
                  <div className="flex flex-col text-center">
                    <span className="italic">
                      {doneTodosLength}/{totalTodos} todos completed
                    </span>
                    <button
                      className="btn-accent btn mt-4 w-[50%] text-center"
                      onClick={() => setOpenModal(!openModal)}
                    >
                      Create Todo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {filteredList ? (
            filteredList?.map((todo) => {
              return <TodoItem key={todo.id} todo={todo} />;
            })
          ) : (
            <div className="align-center flex w-full flex-row justify-center p-24">
              <div className="flex flex-col justify-center">
                Choose a Sprint
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
