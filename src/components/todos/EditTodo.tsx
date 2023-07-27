import type { Todo } from "../../types";
import { api } from "../../utils/api";
import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import toast, { Toaster } from "react-hot-toast";

type TodoProps = {
  todo: Todo;
  onEdit: () => void;
};

export function EditTodo({ todo, onEdit }: TodoProps) {
  const { id, name, description } = todo;
  const ctx = api.useContext();

  console.log(name);

  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const { mutate: updateMutation } = api.todo.updateTodo.useMutation({
    onSettled: async () => {
      toast.success(`${name} updated`);
      await ctx.todo.getAllTodos.invalidate();
      onEdit();
    },
  });

  return (
    <form
      className="flex w-full flex-col gap-4 pt-10"
      onSubmit={(e) => {
        e.preventDefault();
        updateMutation({
          id: id,
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
        width="100%"
        height="30vh"
        minWidth="100%"
        minHeight="30vh"
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
        ]}
        onChange={(value) => setUpdatedDescription(value)}
        className="w-full border border-gray-300 text-lg"
      />
      <div className="flex flex-row justify-end">
        <button className="btn-primary btn w-[25%] rounded-xl">
          Confirm Change
        </button>
      </div>
    </form>
  );
}
