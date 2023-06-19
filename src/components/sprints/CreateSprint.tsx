import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { useState } from "react";

type CreateProps = {
  resetCreating: () => void;
};

export function CreateSprint({ resetCreating }: CreateProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const projectId = router.query.projectId as string;

  const ctx = api.useContext();

  const { mutate } = api.sprint.createSprint.useMutation({
    onSettled: async () => {
      await ctx.sprint.getAllSprints.invalidate();
      setName("");
      setDescription("");
      resetCreating();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ name, description, projectId });
      }}
    >
      <input
        type="text"
        placeholder="Name"
        className="input-bordered input my-4 w-full max-w-xs"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        className="input-bordered input mb-4 w-full max-w-xs"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex flex-row justify-end">
        <button className="btn-accent btn">Create</button>
      </div>
    </form>
  );
}
