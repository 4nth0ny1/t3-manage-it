import type { Todo } from "../../types";

type TodoProps = {
  todo: Todo;
};

export function TodoItem({ todo }: TodoProps) {
  const { name } = todo;

  return (
    <li className="w-full border-b border-black">
      <div className="flex flex-row justify-between">{name}</div>
    </li>
  );
}
