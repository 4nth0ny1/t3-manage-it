import type { Sprint } from "../../types";

type SprintProps = {
  sprint: Sprint;
};

export function SprintItem({ sprint }: SprintProps) {
  const { id, name, description, createdAt } = sprint;

  return <li className="w-full border-b border-black">{name}</li>;
}
