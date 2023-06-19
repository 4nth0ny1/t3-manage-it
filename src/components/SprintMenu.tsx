import { GrAddCircle } from "react-icons/gr";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useState } from "react";

type CreateSprintProps = {
  onShow: any;
  isActive: any;
};

function CreateSprint({ onShow, isActive }: CreateSprintProps) {
  return (
    <div className="flex flex-row justify-end">
      {isActive ? (
        <div className="py-4">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Create a New Sprint</h2>
            <div className="flex flex-col justify-center">
              <AiOutlineMinusCircle onClick={onShow} />
            </div>
          </div>
          <input
            type="text"
            placeholder="Sprint Name"
            className="input-bordered input my-4 w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Sprint Description"
            className="input-bordered input mb-4 w-full max-w-xs "
          />
          <div className="flex flex-row justify-end">
            <button className="btn-accent btn">Create</button>
          </div>
        </div>
      ) : (
        ""
      )}

      {isActive ? (
        ""
      ) : (
        <button onClick={onShow} className="py-6">
          <GrAddCircle />
        </button>
      )}
    </div>
  );
}

export function SprintMenu() {
  const [active, setActive] = useState(false);

  return (
    <div className="border-right-200 min-h-screen w-1/5 bg-purple-200 p-4">
      <ul className="text-2xl">
        <li className="border-b border-black">Sprint 1</li>
        <li className="border-b border-black">Sprint 2</li>
        <li className="border-b border-black">Sprint 3</li>
        <li className="border-b border-black">Sprint 4</li>
      </ul>
      <CreateSprint isActive={!active} onShow={() => setActive(!active)} />
    </div>
  );
}
