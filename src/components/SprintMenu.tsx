import { GrAddCircle } from "react-icons/gr";
import { useState } from "react";
import { SprintList } from "../components/sprints/SprintList";
import { CreateSprint } from "../components/sprints/CreateSprint";

export function SprintMenu() {
  const [creating, setCreating] = useState(false);

  return (
    <div className="border-right-200 min-h-screen w-1/5 bg-purple-200 p-4">
      <h2 className="text-2xl">Sprints</h2>
      <SprintList />
      {!creating ? (
        <CreateSprint />
      ) : (
        <GrAddCircle onClick={() => setCreating(!creating)} />
      )}
    </div>
  );
}
