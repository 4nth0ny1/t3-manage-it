import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";

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

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ name, description, projectId });
      }}
    >
      <motion.input
        initial="hidden"
        animate="visible"
        transition={{ duration: 2 }}
        variants={variants}
        type="text"
        placeholder="Name"
        required
        className="input-bordered input my-4 w-full max-w-xs border-gray-300 "
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <motion.input
        initial="hidden"
        animate="visible"
        transition={{ duration: 2 }}
        variants={variants}
        type="text"
        placeholder="Description"
        required
        className="input-bordered input mb-4 w-full max-w-xs border-gray-300 "
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex flex-row justify-end">
        <motion.button
          initial="hidden"
          animate="visible"
          transition={{ duration: 2 }}
          variants={variants}
          className="btn-accent btn"
        >
          Create
        </motion.button>
      </div>
    </form>
  );
}
