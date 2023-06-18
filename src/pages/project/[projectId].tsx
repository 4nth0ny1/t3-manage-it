import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { type NextPage } from "next";
import { Hero } from "../../components/Hero";
import { SprintMenu } from "../../components/SprintMenu";
import { TodoContainer } from "../../components/TodoContainer";

const SingleProjectPage: NextPage = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;

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
      <Hero project={project} />
      <div className="flex flex-row">
        <SprintMenu />
        <TodoContainer />
      </div>
    </div>
  );
};

export default SingleProjectPage;
