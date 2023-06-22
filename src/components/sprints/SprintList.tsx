import { api } from "../../utils/api";
import { SprintItem } from "./SprintItem";
import { useRouter } from "next/router";

export function SprintList({ upClick }) {
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
        return (
          <div key={sprint.id} onClick={upClick}>
            <SprintItem sprint={sprint} />
          </div>
        );
      })}
    </ul>
  );
}
