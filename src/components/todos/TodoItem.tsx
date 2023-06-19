import { api } from "~/utils/api";
import type { Todo } from "../../types";
import { RiDeleteBin2Fill } from "react-icons/ri";

type TodoProps = {
  todo: Todo;
};

export function TodoItem({ todo }: TodoProps) {
  const { id, name, description, createdAt } = todo;

  return (
    <li className="w-full border-b border-black">
      <div className="flex flex-row justify-between">{name}</div>
    </li>
  );
}
