import { EditProject } from "./projects/EditProject";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";

type ProjectProps = {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  projectId: string;
};

export function Hero({ id, name, description, projectId }: ProjectProps) {
  const [editingProject, setProjectEditing] = useState(false);
  return (
    <div className="hero flex flex-row justify-center gap-20 border-b bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{name}</h1>
          <p className="py-6">{description}</p>
        </div>
      </div>
      <AiFillEdit
        className="text-3xl text-green-400"
        onClick={() => setProjectEditing(!editingProject)}
      />
      {editingProject && (
        <EditProject
          id={id}
          name={name}
          description={description}
          projectId={projectId}
          onProjectEdit={() => setProjectEditing(!editingProject)}
        />
      )}
    </div>
  );
}
