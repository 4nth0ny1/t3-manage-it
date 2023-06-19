import type { Sprint } from "../../types";
import { RiDeleteBin2Fill } from "react-icons/ri";

type SprintProps = {
  sprint: Sprint;
};

export function SprintItem({ sprint }: SprintProps) {
  const { id, name, description, createdAt } = sprint;

  return (
    <li className="w-full border-b border-black">
      <div className="flex flex-row justify-between">
        {name}
        <button className="text-error">
          <RiDeleteBin2Fill />
        </button>
      </div>
    </li>
  );
}
