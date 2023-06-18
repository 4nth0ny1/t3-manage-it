import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { type NextPage } from "next";

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

  return <div className="w-full ">{project?.name}</div>;
};

export default SingleProjectPage;
