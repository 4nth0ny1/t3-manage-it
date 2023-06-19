import { GrAddCircle } from "react-icons/gr";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useState } from "react";
import { SprintList } from "../components/sprints/SprintList";

// type CreateSprintProps = {
//   onShow: any;
//   isActive: any;
// };

// function CreateSprint({ onShow, isActive }: CreateSprintProps) {
//   return (
//     <div className="flex flex-row justify-end">
//       {isActive ? (
//         <div className="py-4">
//           <div className="flex flex-row justify-between">
//             <h2 className="text-2xl">Create a New Sprint</h2>
//             <div className="flex flex-col justify-center">
//               <AiOutlineMinusCircle onClick={onShow} />
//             </div>
//           </div>
//           <input
//             type="text"
//             placeholder="Name"
//             className="input-bordered input my-4 w-full max-w-xs"
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             className="input-bordered input mb-4 w-full max-w-xs "
//           />
//           <div className="flex flex-row justify-end">
//             <button className="btn-accent btn">Create</button>
//           </div>
//         </div>
//       ) : (
//         ""
//       )}

//       {isActive ? (
//         ""
//       ) : (
//         <button onClick={onShow} className="py-6">
//           <GrAddCircle />
//         </button>
//       )}
//     </div>
//   );
// }

export function SprintMenu() {
  const [active, setActive] = useState(false);

  return (
    <div className="border-right-200 min-h-screen w-1/5 bg-purple-200 p-4">
      <SprintList />
      {/* <CreateSprint isActive={!active} onShow={() => setActive(!active)} /> */}
    </div>
  );
}
