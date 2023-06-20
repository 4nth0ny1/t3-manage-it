import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { type NextPage } from "next";
import { SprintMenu } from "~/components/SprintMenu";
import { TodoContainer } from "~/components/TodoContainer";
import { Hero } from "~/components/Hero";

const SingleSprintPage: NextPage = () => {
  const router = useRouter();

  const [sprintId, setSprintId] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const sprintId = router.query.sprintId as string;
    setSprintId(sprintId);
  }, [router.isReady, router.query]);

  const {
    data: sprint,
    isLoading,
    isError,
  } = api.sprint.getOneSprint.useQuery({ sprintId });

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="w-full">
      <Hero name="hello there" description="yo yo sah" />
      <div className="flex flex-row">
        <SprintMenu />
        <TodoContainer sprintId={sprintId} />
      </div>
    </div>
  );
};

export default SingleSprintPage;
