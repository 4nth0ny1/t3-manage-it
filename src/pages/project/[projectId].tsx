import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { type NextPage } from "next";
import { Hero } from "../../components/Hero";
import { SprintMenu } from "../../components/SprintMenu";
import { TodoList } from "../../components/todos/TodoList";
import type { Project } from "../../types";

const SingleProjectPage: NextPage = () => {
  const router = useRouter();
  const [projectId, setProjectId] = useState("");
  const [sprintId, setSprintId] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const projectId = router.query.projectId as string;
    setProjectId(projectId);
  }, [router.isReady, router.query]);

  const {
    data: project,
    isLoading,
    isError,
  }: {
    data: Project | undefined | null;
    isLoading: boolean;
    isError: boolean;
  } = api.project.getOneProject.useQuery({
    projectId,
  });

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Something went wrong</div>;

  const handleClick = (id: string) => {
    setSprintId(id);
  };

  return (
    <div className="flex w-full flex-row">
      <div className="flex w-1/5 flex-col">
        <Hero
          id={project?.id}
          name={project?.name}
          description={project?.description}
          projectId={projectId}
        />
        <SprintMenu upLift={handleClick} />
      </div>
      <div className="min-h-screen w-4/5 p-4">
        <TodoList sprintId={sprintId} />
      </div>
    </div>
  );
};

export default SingleProjectPage;
