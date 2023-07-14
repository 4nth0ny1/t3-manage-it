import type { Project } from "../../types";
import Link from "next/link";
import { motion } from "framer-motion";

type ProjectProps = {
  project: Project;
};

export function ProjectItem({ project }: ProjectProps) {
  const { id, name, description, createdAt } = project;

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <div className="flex flex-row justify-center gap-1 p-2 md:p-4">
      <Link href={`/project/${id}`}>
        <motion.button
          className="btn-accent btn flex flex-col  text-black"
          initial="hidden"
          animate="visible"
          transition={{ duration: 2 }}
          variants={variants}
        >
          <div>{name}</div>
        </motion.button>
      </Link>
    </div>
  );
}
