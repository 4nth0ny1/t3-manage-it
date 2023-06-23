import type { Project } from "../../types";
import Link from "next/link";

type ProjectProps = {
  project: Project;
};

export function ProjectItem({ project }: ProjectProps) {
  const { id, name, description, createdAt } = project;

  return (
    <div className="flex flex-row justify-center p-4">
      <Link href={`/project/${id}`}>
        <button className="btn flex flex-col bg-gray-400 text-black hover:bg-gray-500">
          <div>{name}</div>
        </button>
      </Link>
    </div>
  );
}
