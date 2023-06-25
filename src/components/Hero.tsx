import { EditProject } from "./projects/EditProject";

type ProjectProps = {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  projectId: string;
};

export function Hero({ id, name, description, projectId }: ProjectProps) {
  return (
    <div className="hero flex flex-row justify-center gap-20 border-b bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{name}</h1>
          <p className="py-6">{description}</p>
        </div>
      </div>
      <EditProject
        id={id}
        name={name}
        description={description}
        projectId={projectId}
      />
    </div>
  );
}
