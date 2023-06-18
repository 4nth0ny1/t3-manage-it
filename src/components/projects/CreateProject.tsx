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
        className="input-bordered input mb-4 w-full max-w-xs text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        className="input-bordered input mb-4 w-full max-w-xs text-black"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="btn-accent btn max-w-[100px]">Create</button>
    </form>
  );
}
