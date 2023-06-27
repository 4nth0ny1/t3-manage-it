import type { Project } from "../../types";
import Link from "next/link";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { api } from "../../utils/api";

type ProjectProps = {
  project: Project;
};

export function ProjectItem({ project }: ProjectProps) {
  const { id, name, description, createdAt } = project;

  const ctx = api.useContext();

  const { mutate: deleteMutation } = api.project.deleteProject.useMutation({
    onSettled: async () => {
      await ctx.project.getAllProjects.invalidate();
    },
  });

  return (
    <div className="flex flex-row justify-center gap-1 p-4">
      <Link href={`/project/${id}`}>
        <button className="btn flex flex-col bg-gray-400 text-black hover:bg-gray-500">
          <div>{name}</div>
        </button>
      </Link>
      <div className="flex flex-col justify-center text-xl">
        <RiDeleteBin2Fill
          className="cursor-pointer text-pink-400"
          onClick={() => deleteMutation(id)}
        />
      </div>
    </div>
  );
}
