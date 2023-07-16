import { api } from "~/utils/api";
import type { Sprint } from "../../types";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import { ProgressBarLine } from "../ProgressBarLine";

type SprintProps = {
  sprint: Sprint;
  upLift: (id: string) => void;
};

export function SprintItem({ sprint, upLift }: SprintProps) {
  const { id, name } = sprint;
  const router = useRouter();

  const sprintId = id;

  const ctx = api.useContext();

  const { mutate: deleteMutation } = api.sprint.deleteSprint.useMutation({
    onSettled: async () => {
      await ctx.sprint.getAllSprints.invalidate();
      router.reload();
    },
  });

  const { data: allTodos } = api.todo.getAllTodos.useQuery({ sprintId });

  const doneTodos = allTodos?.filter((todo) => {
    return todo.done;
  });
  const totalTodos = allTodos?.length as number;
  const doneTodosLength = doneTodos?.length as number;
  const percentDone = ((100 * doneTodosLength) / totalTodos).toFixed(0);

  let numberPercent: number = parseInt(percentDone);
  if (isNaN(numberPercent)) numberPercent = 0;

  return (
    <li className="w-full border-b">
      <div className="flex flex-row justify-between">
        <p onClick={() => upLift(id)}>{name}</p>
        <button onClick={() => deleteMutation(id)} className="text-error">
          <RiDeleteBin2Fill className="icon-color-delete" />
        </button>
      </div>
      <ProgressBarLine percentDone={numberPercent} height="h-[10px]" />
    </li>
  );
}
