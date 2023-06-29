import { useState } from "react";
import { SprintList } from "../components/sprints/SprintList";
import { CreateSprint } from "../components/sprints/CreateSprint";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

type SprintProps = {
  upLift: (id: string) => void;
};

export function SprintMenu({ upLift }: SprintProps) {
  const [creating, setCreating] = useState(false);

  return (
    <div className="menu-background rounded-3xl p-8">
      <h2 className="text-2xl">Sprints</h2>

      <SprintList upLift={upLift} />
      {creating ? (
        <div>
          <div className="flex flex-row justify-end py-4">
            <AiFillMinusCircle
              className="icon-color-delete text-xl"
              onClick={() => setCreating(!creating)}
            />
          </div>
          <CreateSprint resetCreating={() => setCreating(!creating)} />
        </div>
      ) : (
        <div className="flex flex-row justify-end py-4">
          <AiFillPlusCircle
            className="icon-color-plus-minus text-xl"
            onClick={() => setCreating(!creating)}
          />
        </div>
      )}
    </div>
  );
}
