import type { Todo } from "../../types";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { api } from "~/utils/api";

type TodoProps = {
  todo: Todo;
};

export function TodoItem({ todo }: TodoProps) {
  const { id, name, description, sprintId } = todo;
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
            <AiFillEdit className="text-yellow-400" />
            <BsFillTrashFill
              className="text-red-500"
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
        <p className="text-lg font-thin italic">Created: 6 hours ago</p>
        {showDescription && <p className="text-lg">{description}</p>}
      </div>
    </li>
  );
}
