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

  const { mutate: updateMutation } = api.todo.updateTodo.useMutation({
    onSettled: async () => {
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
      <textarea
        className="input-bordered input h-[200px] w-full border-gray-300 p-4 text-gray-300"
        placeholder={description}
        onChange={(e) => setUpdatedDescription(e.target.value)}
      />
      <div className="flex flex-row justify-end">
        <button className="btn-primary btn w-[25%] rounded-xl">
          Confirm Change
        </button>
      </div>
    </form>
  );
}
