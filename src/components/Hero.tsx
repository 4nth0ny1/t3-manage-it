import { EditProject } from "./projects/EditProject";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { BsBackspace } from "react-icons/bs";

type ProjectProps = {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  projectId: string;
};

export function Hero({ id, name, description, projectId }: ProjectProps) {
  const [editingProject, setProjectEditing] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const shortDesc = description?.substring(0, 50);

  return (
    <div className="hero flex flex-row justify-center gap-20 border-b bg-base-100">
      <div className="hero-content text-center">
        <div className="">
          <h1
            className="text-5xl font-bold"
            onClick={() => setShowDescription(!showDescription)}
          >
            {name}
          </h1>

          <article className="prose text-lg lg:prose-xl">
            {showDescription ? (
              <div>
                <ReactMarkdown>{description as string}</ReactMarkdown>
                <p
                  onClick={() => setShowDescription(!showDescription)}
                  className="text-sm italic"
                >
                  Read less
                </p>
              </div>
            ) : (
              <div>
                <ReactMarkdown>{shortDesc as string}</ReactMarkdown>
                <p
                  onClick={() => setShowDescription(!showDescription)}
                  className="text-sm italic"
                >
                  Read more
                </p>
              </div>
            )}
          </article>
        </div>
      </div>
      {editingProject ? (
        <BsBackspace
          className="text-3xl text-pink-400"
          onClick={() => setProjectEditing(!editingProject)}
        />
      ) : (
        <AiFillEdit
          className="text-3xl text-green-400"
          onClick={() => setProjectEditing(!editingProject)}
        />
      )}
      <div className="h-[400px] w-[600px]">
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
    </div>
  );
}
