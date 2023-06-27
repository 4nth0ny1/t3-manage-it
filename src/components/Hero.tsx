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
    <div className="mb-4 flex flex-col  rounded-3xl bg-base-100 bg-gray-800 p-8">
      <div className="">
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
      <div className="flex flex-row justify-end">
        {editingProject ? (
          <BsBackspace
            className="text-2xl text-pink-400"
            onClick={() => setProjectEditing(!editingProject)}
          />
        ) : (
          <AiFillEdit
            className="text-2xl text-green-400"
            onClick={() => setProjectEditing(!editingProject)}
          />
        )}
      </div>

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
