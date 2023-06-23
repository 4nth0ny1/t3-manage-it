import { api } from "~/utils/api";
import type { Sprint } from "../../types";
import { RiDeleteBin2Fill } from "react-icons/ri";

type SprintProps = {
  sprint: Sprint;
  upLift: (id: string) => void;
};

export function SprintItem({ sprint, upLift }: SprintProps) {
  const { id, name } = sprint;

  const ctx = api.useContext();

  const { mutate: deleteMutation } = api.sprint.deleteSprint.useMutation({
    onSettled: async () => {
      await ctx.sprint.getAllSprints.invalidate();
    },
  });

  return (
    <li className="w-full border-b">
      <div className="flex flex-row justify-between">
        <p onClick={() => upLift(id)}>{name}</p>
        <button onClick={() => deleteMutation(id)} className="text-error">
          <RiDeleteBin2Fill className="text-pink-400" />
        </button>
      </div>
    </li>
  );
}
