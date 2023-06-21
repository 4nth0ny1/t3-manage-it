import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { type NextPage } from "next";
import { Hero } from "../../components/Hero";
import { SprintMenu } from "../../components/SprintMenu";
import { TodoContainer } from "../../components/TodoContainer";

const SingleProjectPage: NextPage = () => {
  const router = useRouter();
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const projectId = router.query.projectId as string;
    setProjectId(projectId);
  }, [router.isReady, router.query]);

  const {
    data: project,
    isLoading,
    isError,
  } = api.project.getOneProject.useQuery({
    projectId,
  });

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="w-full">
      <Hero
        name={project?.name as string}
        description={project?.description as string}
      />
      <div className="flex flex-row">
        <SprintMenu />
        <TodoContainer projectId={projectId} />
      </div>
    </div>
  );
};

export default SingleProjectPage;
