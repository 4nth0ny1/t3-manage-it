import { api } from "../../utils/api";
import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

type ProjectProps = {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  projectId: string;
  onProjectEdit: () => void;
};

export function EditProject({
  id,
  name,
  description,
  projectId,
  onProjectEdit,
}: ProjectProps) {
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const ctx = api.useContext();

  const { mutate: updateMutation } = api.project.updateProject.useMutation({
    onSettled: async () => {
      await ctx.project.getOneProject.invalidate();
      onProjectEdit();
    },
  });

  return (
    <form
      className="mb-8 flex flex-col gap-4 pt-10"
      onSubmit={(e) => {
        e.preventDefault();
        updateMutation({
          projectId: id as string,
          name: updatedName,
          description: updatedDescription,
        });
      }}
    >
      <input
        type="text"
        className="input-bordered input w-full border-gray-300 text-gray-300"
        placeholder={name}
        onChange={(e) => setUpdatedName(e.target.value)}
      />

      <CodeMirror
        value={updatedDescription}
        placeholder={description}
        width="600px"
        height="20vh"
        minWidth="100%"
        minHeight="20vh"
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
        ]}
        onChange={(value) => setUpdatedDescription(value)}
        className="border border-gray-300 text-lg"
      />

      <div className="flex flex-row justify-end">
        <button className="btn-primary btn w-[25%] rounded-xl">
          Confirm Change
        </button>
      </div>
    </form>
  );
}
