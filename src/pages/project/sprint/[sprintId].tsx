import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import { type NextPage } from "next";
import Link from "next/link";

const SingleSprintPage: NextPage = () => {
  const router = useRouter();
  const sprintId = router.query.sprintId as string;

  const {
    data: sprint,
    isLoading,
    isError,
  } = api.sprint.getOneSprint.useQuery({ sprintId });

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="flex w-full flex-col text-black">
      <h1>Single Sprint Page</h1>
      {/* <Link href={`/topic/${post?.topicId as string}`}>
        <p className="px-8 py-2 text-right text-xl italic text-accent">back</p>
      </Link>
      <div className="flex flex-row justify-end">
        <Hero post={post} />
        <div className="mb-10 flex w-full flex-col justify-center">
          <CreateComment topicId={post?.topicId as string} />
        </div>
      </div>
      <CommentList postId={postId} /> */}
    </div>
  );
};

export default SingleSprintPage;
