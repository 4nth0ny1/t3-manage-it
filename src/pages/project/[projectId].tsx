import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { type NextPage } from "next";
import { Hero } from "../../components/Hero";
import { SprintMenu } from "../../components/SprintMenu";
import { TodoList } from "../../components/todos/TodoList";

const SingleProjectPage: NextPage = () => {
  const router = useRouter();
  const [projectId, setProjectId] = useState("");
  const [target, setTarget] = useState("");

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

  function handleChange(e) {
    console.log(e.target);
    // setTarget(e.target);
  }

  return (
    <div className="w-full">
      <Hero
        name={project?.name as string}
        description={project?.description as string}
      />
      <div className="flex flex-row">
        <SprintMenu onClick={handleChange} />
        {target}
        <TodoList />
      </div>
    </div>
  );
};

export default SingleProjectPage;
