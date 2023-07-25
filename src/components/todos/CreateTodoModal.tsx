import { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import type { Todo } from "../../types";
import { useSession } from "next-auth/react";

type OpenModalProps = {
  resetModal: () => void;
};

export default function CreateTodoModal({ resetModal }: OpenModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const sprintId = selectValue;

  const ctx = api.useContext();
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const { data: sprints } = api.sprint.getAllSprints.useQuery({ projectId });

  const { mutate } = api.todo.createTodo.useMutation({
    onMutate: async () => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await ctx.todo.getAllTodos.cancel();

      // Snapshot the previous value
      const previousTodos = ctx.todo.getAllTodos.getData({ sprintId });

      // Optimistically update to the new value
      ctx.todo.getAllTodos.setData({ sprintId }, (prev) => {
        const optimisticTodo: Todo = {
          id: "optimistic-todo-id",
          name: name, // 'placeholder'
          description: description,
          done: false,
          sprintId: sprintId,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: userId as string,
          projectId: projectId,
        };
        if (!prev) return [optimisticTodo];
        return [...prev, optimisticTodo];
      });

      // Clear input
      setName("");
      setDescription("");

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onSettled: async () => {
      await ctx.todo.getAllTodos.invalidate();
      setName("");
      setDescription("");
      resetModal();
    },
  });

  return (
    <div className="flex flex-row justify-center">
      <form
        className="flex w-[800px] flex-col pt-4"
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ name, description, sprintId, projectId });
        }}
      >
        <div>
          <h2 className=" text-center text-3xl">Create a New Todo</h2>
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
        <div className="mt-4 flex flex-row justify-end">
          <button className="btn-accent btn w-[25%]">Create</button>
        </div>
      </form>
    </div>
  );
}
