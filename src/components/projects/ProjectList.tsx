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
      <h2 className="pb-4 text-center text-3xl ">Projects</h2>
      <CreateProject />
      <hr className="border-b-2 border-gray-400 md:border-none"></hr>
      <div className="mt-4 flex flex-col  flex-wrap md:flex-row">
        {projects?.map((project) => {
          return <ProjectItem key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}
