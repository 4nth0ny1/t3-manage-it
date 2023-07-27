import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { type NextPage } from "next";
import { Hero } from "../../components/Hero";
import { SprintMenu } from "../../components/SprintMenu";
import { TodoList } from "../../components/todos/TodoList";
import type { Project } from "../../types";
import type { User } from "../../types";
import {
  TbLayoutBottombarCollapse,
  TbLayoutNavbarCollapse,
} from "react-icons/tb";

const SingleProjectPage: NextPage = () => {
  const router = useRouter();
  const [projectId, setProjectId] = useState("");
  const [sprintId, setSprintId] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);

  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id as string;

  const { data: user }: { data: User | undefined | null } =
    api.user.getUserProfile.useQuery({
      userId,
    });

  useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement;
    html.setAttribute("data-theme", user?.theme as string);
  }, [user?.theme]);

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
    <div className="flex w-full flex-col p-8 md:flex-row">
      {showSideBar ? (
        <>
          <div>
            <button
              className=" px-4"
              onClick={() => setShowSideBar(!showSideBar)}
            >
              <TbLayoutBottombarCollapse className="text-3xl" />
            </button>
          </div>
          <div className="min-h-screen w-full md:px-4">
            <TodoList sprintId={sprintId} />
          </div>
        </>
      ) : (
        <>
          <div className="flex w-full flex-col md:w-1/5">
            <button
              className="px-4 pb-4"
              onClick={() => setShowSideBar(!showSideBar)}
            >
              <TbLayoutNavbarCollapse className="text-3xl" />
            </button>
            <Hero
              id={project?.id as string}
              name={project?.name}
              description={project?.description}
              projectId={projectId}
            />
            <SprintMenu upLift={handleClick} />
          </div>

          <div className="min-h-screen w-full md:w-4/5 md:px-4">
            <TodoList sprintId={sprintId} />
          </div>
        </>
      )}
    </div>
  );
};

export default SingleProjectPage;
