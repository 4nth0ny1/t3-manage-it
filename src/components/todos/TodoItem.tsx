import type { Todo } from "../../types";
import { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type TodoProps = {
  todo: Todo;
};

dayjs.extend(relativeTime);

export function TodoItem({ todo }: TodoProps) {
  const { id, name, description, sprintId, createdAt } = todo;
  const [showDescription, setShowDescription] = useState(false);
  const ctx = api.useContext();

  const { mutate: deleteMutation } = api.todo.deleteTodo.useMutation({
    onSettled: async () => {
      await ctx.todo.getAllTodosFromProject.invalidate();
    },
  });

  return (
    <li className="flex w-full flex-row justify-center">
      <div className="flex w-[70%] flex-col justify-between border-b py-4">
        <div className="flex flex-row justify-between">
          <h2
            onClick={() => setShowDescription(!showDescription)}
            className="text-xl"
          >
            {name}
          </h2>
          <div className="flex flex-row gap-4 ">
            <AiFillEdit className="text-green-400" />
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
  );
}
