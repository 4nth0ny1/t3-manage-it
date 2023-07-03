import { api } from "../../utils/api";
import { useState } from "react";

export function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const ctx = api.useContext();

  const { mutate } = api.project.createProject.useMutation({
    onSettled: async () => {
      await ctx.project.getAllProjects.invalidate();
      setName("");
      setDescription("");
    },
  });

  return (
    <form
      className="m-4 flex min-w-[400px] flex-col items-center"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ name, description });
      }}
    >
      <input
        type="text"
        placeholder="Name"
        required
        className="input-bordered input mb-4 w-full max-w-xs border-gray-400 text-gray-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        required
        className="input-bordered input mb-4 w-full max-w-xs border-gray-400 text-gray-400"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="btn-accent btn max-w-[100px]">Create</button>
    </form>
  );
}
