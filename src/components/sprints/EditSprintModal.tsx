import { useState } from "react";
import { api } from "../../utils/api";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

type SprintProps = {
  id: string;
  name: string | undefined;
  description: string | undefined;
  sprintId: string;
  onSprintEdit: () => void;
};

export function EditSprintModal({
  id,
  name,
  description,
  sprintId,
  onSprintEdit,
}: SprintProps) {
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const ctx = api.useContext();

  const { mutate: updateMutation } = api.sprint.updateSprint.useMutation({
    onSettled: async () => {
      await ctx.sprint.getAllSprints.invalidate();
      await ctx.sprint.getOneSprint.invalidate();
      onSprintEdit();
    },
  });

  return (
    <div className="flex flex-row justify-center">
      <form
        className="mb-8 flex w-[800px] flex-col gap-4 pt-10"
        onSubmit={(e) => {
          e.preventDefault();
          updateMutation({
            id: id,
            name: updatedName,
            description: updatedDescription,
          });
        }}
      >
        <h2 className=" text-center text-3xl">Edit Your Sprint</h2>
        <input
          type="text"
          className="input-bordered input w-full border-gray-300 text-gray-300"
          placeholder={name}
          onChange={(e) => setUpdatedName(e.target.value)}
        />

        <CodeMirror
          value={updatedDescription}
          placeholder={description}
          width="500px"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setUpdatedDescription(value)}
          className="border border-gray-300 text-lg text-gray-800"
        />
        <div className="flex flex-row justify-end">
          <button className="btn-primary btn w-[25%] rounded-xl">
            Confirm Change
          </button>
        </div>
      </form>
    </div>
  );
}
