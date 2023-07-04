import { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export function CreateTodo() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [showForm, setShowForm] = useState(false);

  const sprintId = selectValue;

  const ctx = api.useContext();

  const router = useRouter();
  const projectId = router.query.projectId as string;

  const { mutate } = api.todo.createTodo.useMutation({
    onSettled: async () => {
      await ctx.todo.getAllTodos.invalidate();
      setName("");
      setDescription("");
    },
  });

  const { data: sprints } = api.sprint.getAllSprints.useQuery({ projectId });

  return (
    <div className="flex w-[700px] flex-col rounded-2xl border-2 border-gray-500 p-6">
      <div
        onClick={() => setShowForm(!showForm)}
        className="flex flex-row justify-between"
      >
        <h2>Create a Todo</h2>
        <div className="flex flex-col justify-center text-3xl">
          {!showForm ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
        </div>
      </div>
      {showForm && (
        <form
          className="flex flex-col pt-4"
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ name, description, sprintId, projectId });
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Name"
              required
              className="input-bordered input my-4 w-full border-gray-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              className="input-bordered input mb-4 w-full border-b border-gray-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              className="select w-full max-w-xs border-gray-300"
              onChange={(e) => setSelectValue(e.target.value)}
              required
            >
              <option value="" disabled selected>
                Pick Sprint
              </option>
              {sprints?.map((sprint) => {
                return (
                  <option value={sprint.id} key={sprint.id}>
                    {sprint.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className=" flex flex-row justify-end">
            <button className="btn-accent btn w-[25%]">Create</button>
          </div>
        </form>
      )}
    </div>
  );
}
