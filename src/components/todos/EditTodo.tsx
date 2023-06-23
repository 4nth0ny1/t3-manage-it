import type { Todo } from "../../types";
import { api } from "../../utils/api";
import { useState } from "react";

type TodoProps = {
  todo: Todo;
  onEdit: () => void;
};

export function EditTodo({ todo, onEdit }: TodoProps) {
  const { id, name, description } = todo;
  const ctx = api.useContext();

  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  //   const [updatedContent, setUpdatedContent] = useState({
  //     id: id,
  //     name: updatedName,
  //     description: updatedDescription,
  //   });

  const { mutate: updateMutation } = api.todo.updateTodo.useMutation({
    onSettled: async () => {
      await ctx.todo.getAllTodos.invalidate();
      onEdit();
    },
  });

  return (
    <form
      className="flex flex-row gap-4 pt-10"
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
        className="input-bordered input w-full max-w-xs border-gray-300 text-gray-300"
        placeholder="Name"
        onChange={(e) => setUpdatedName(e.target.value)}
      />
      <input
        type="text"
        className="input-bordered input w-full max-w-xs border-gray-300 text-gray-300"
        placeholder="Description"
        onChange={(e) => setUpdatedDescription(e.target.value)}
      />
      <button className="btn-primary btn rounded-xl">Confirm Change</button>
    </form>
  );
}
