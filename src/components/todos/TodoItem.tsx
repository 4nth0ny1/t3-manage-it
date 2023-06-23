import type { Todo } from "../../types";
import { Fragment, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { EditTodo } from "../todos/EditTodo";

type TodoProps = {
  todo: Todo;
};

dayjs.extend(relativeTime);

export function TodoItem({ todo }: TodoProps) {
  const { id, name, description, sprintId, done, createdAt } = todo;
  const [showDescription, setShowDescription] = useState(false);
  const [editing, setEditing] = useState(false);

  const ctx = api.useContext();

  const { mutate: deleteMutation } = api.todo.deleteTodo.useMutation({
    onSettled: async () => {
      await ctx.todo.getAllTodos.invalidate();
    },
  });

  const { mutate: toggleMutation } = api.todo.toggleTodo.useMutation({
    onSettled: async () => {
      await ctx.todo.getAllTodos.invalidate();
    },
  });

  return (
    <Fragment>
      {editing ? (
        <div className="flex w-full flex-row justify-center">
          <EditTodo todo={todo} onEdit={() => setEditing(!editing)} />
        </div>
      ) : (
        <li className="flex w-full flex-row justify-center">
          <div className="flex w-[70%] flex-col justify-between border-b py-4">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-4">
                <div className="form-control">
                  <input
                    type="checkbox"
                    checked={done as boolean}
                    className="checkbox-success checkbox cursor-pointer"
                    onChange={(e) =>
                      toggleMutation({ id, done: e.target.checked })
                    }
                  />
                </div>
                <h2
                  onClick={() => setShowDescription(!showDescription)}
                  className="flex flex-col justify-center text-xl"
                >
                  {name}
                </h2>
              </div>
              <div className="flex flex-row gap-4">
                <AiFillEdit
                  onClick={() => setEditing(!editing)}
                  className="text-green-400"
                />
                <RiDeleteBin2Fill
                  className="text-pink-400"
                  onClick={() => deleteMutation(id)}
                />
                {showDescription ? (
                  <IoMdArrowDropup
                    onClick={() => setShowDescription(!showDescription)}
                  />
                ) : (
                  <IoMdArrowDropdown
                    onClick={() => setShowDescription(!showDescription)}
                  />
                )}
              </div>
            </div>
            <p className="text-lg font-thin italic">
              <span className="font-thin italic">{` Created ${dayjs(
                createdAt
              ).fromNow()}`}</span>
            </p>
            {showDescription && <p className="text-lg">{description}</p>}
          </div>
        </li>
      )}
    </Fragment>
  );
}
