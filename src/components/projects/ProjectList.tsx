import { api } from "../../utils/api";
import { ProjectItem } from "./ProjectItem";
import { CreateProject } from "./CreateProject";

export function ProjectList() {
  const {
    data: projects,
    isLoading,
    isError,
  } = api.project.getAllProjects.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div>
      <h2 className="pb-4 text-center text-3xl">Topics</h2>
      <CreateProject />
      <div className="flex flex-row flex-wrap">
        {projects?.map((project) => {
          return <ProjectItem key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}
