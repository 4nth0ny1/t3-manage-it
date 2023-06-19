import { api } from "~/utils/api";
import type { Sprint } from "../../types";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Link from "next/link";

type SprintProps = {
  sprint: Sprint;
};

export function SprintItem({ sprint }: SprintProps) {
  const { id, name, description, createdAt } = sprint;

  const ctx = api.useContext();

  const { mutate: deleteMutation } = api.sprint.deleteSprint.useMutation({
    onSettled: async () => {
      await ctx.sprint.getAllSprints.invalidate();
    },
  });

  return (
    <li className="w-full border-b border-black">
      <div className="flex flex-row justify-between">
        <Link href={`/project/sprint/${id}`}>{name}</Link>
        <button onClick={() => deleteMutation(id)} className="text-error">
          <RiDeleteBin2Fill />
        </button>
      </div>
    </li>
  );
}
