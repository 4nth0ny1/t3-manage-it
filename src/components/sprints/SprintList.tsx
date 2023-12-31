import { api } from "../../utils/api";
import { SprintItem } from "./SprintItem";
import { useRouter } from "next/router";

type SprintProps = {
  upLift: (id: string) => void;
};

export function SprintList({ upLift }: SprintProps) {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const {
    data: sprints,
    isLoading,
    isError,
  } = api.sprint.getAllSprints.useQuery({ projectId });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <ul className="flex flex-col text-2xl">
      {sprints?.map((sprint) => {
        return <SprintItem key={sprint.id} sprint={sprint} upLift={upLift} />;
      })}
    </ul>
  );
}
