import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import { useState } from "react";
import { SprintList } from "../components/sprints/SprintList";
import { CreateSprint } from "../components/sprints/CreateSprint";

export function SprintMenu() {
  const [creating, setCreating] = useState(false);

  return (
    <div className="border-right-200 min-h-screen w-1/5 border-black p-4">
      <h2 className="text-2xl">Sprints</h2>

      <SprintList />
      {creating ? (
        <div>
          <div className="flex flex-row justify-end py-4">
            <GrSubtractCircle onClick={() => setCreating(!creating)} />
          </div>
          <CreateSprint resetCreating={() => setCreating(!creating)} />
        </div>
      ) : (
        <div className="flex flex-row justify-end py-4">
          <GrAddCircle onClick={() => setCreating(!creating)} />
        </div>
      )}
    </div>
  );
}
