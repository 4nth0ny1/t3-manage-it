import type { Todo } from "../../types";
import { Fragment, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { EditTodo } from "../todos/EditTodo";
import ReactMarkdown from "react-markdown";
import toast, { Toaster } from "react-hot-toast";

type TodoProps = {
  todo: Todo;
};

dayjs.extend(relativeTime);

export function TodoItem({ todo }: TodoProps) {
  const { id, name, description, sprintId, done, createdAt } = todo;
  const [showDescription, setShowDescription] = useState(false);
  const [editing, setEditing] = useState(false);

  const ctx = api.useContext();

  const { mutate: deleteMutation } = api.todo.deleteTodo.useMutation({
    onMutate: async (deleteId) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await ctx.todo.getAllTodos.cancel();

      // Snapshot the previous value
      const previousTodos = ctx.todo.getAllTodos.getData({ sprintId });

      // Optimistically update to the new value
      ctx.todo.getAllTodos.setData({ sprintId }, (prev) => {
        if (!prev) return previousTodos;
        return prev.filter((t) => t.id !== deleteId);
      });

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      toast.error(`An error occured when deleting todo`);
      if (!context) return;
      ctx.todo.getAllTodos.setData({ sprintId }, () => context.previousTodos);
    },
    onSettled: async () => {
      toast.success(`${name} deleted`);
      await ctx.todo.getAllTodos.invalidate();
    },
  });

  const { mutate: toggleMutation } = api.todo.toggleTodo.useMutation({
    onMutate: async ({ id, done }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await ctx.todo.getAllTodos.cancel();

      // Snapshot the previous value
      const previousTodos = ctx.todo.getAllTodos.getData({ sprintId });

      // Optimistically update to the new value
      ctx.todo.getAllTodos.setData({ sprintId }, (prev) => {
        if (!prev) return previousTodos;
        return prev.map((t) => {
          if (t.id === id) {
            return {
              ...t,
              done,
            };
          }
          return t;
        });
      });

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onSuccess: (err, { done }) => {
      if (done) {
        toast.success("Todo completed 🎉");
      }
    },
    onError: (err, done, context) => {
      toast.error(
        `An error occured when marking todo as ${done ? "done" : "undone"}`
      );
      if (!context) return;
      ctx.todo.getAllTodos.setData({ sprintId }, () => context.previousTodos);
    },
    onSettled: async () => {
      await ctx.todo.getAllTodos.invalidate();
    },
  });

  return (
    <Fragment>
      {editing ? (
        <div className="flex w-full flex-row justify-center pb-4">
          <div className="flex w-full flex-row justify-center md:w-[70%]">
            <EditTodo todo={todo} onEdit={() => setEditing(!editing)} />
          </div>
        </div>
      ) : (
        <li className="flex w-full flex-row justify-center">
          <div className="flex w-full flex-col justify-between border-b py-4 md:w-[70%]">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-4">
                <div className="form-control">
                  <input
                    type="checkbox"
                    checked={done}
                    className="checkbox-accent checkbox cursor-pointer"
                    onChange={(e) =>
                      toggleMutation({ id, done: e.target.checked })
                    }
                  />
                </div>
                {done ? (
                  <h2
                    onClick={() => setShowDescription(!showDescription)}
                    className="flex flex-col justify-center text-xl line-through"
                  >
                    {name}
                  </h2>
                ) : (
                  <h2
                    onClick={() => setShowDescription(!showDescription)}
                    className="flex flex-col justify-center text-xl"
                  >
                    {name}
                  </h2>
                )}
              </div>
              <div className="flex flex-row gap-4">
                {!done && (
                  <div className="flex flex-row gap-4">
                    <AiFillEdit
                      onClick={() => setEditing(!editing)}
                      className="icon-color-edit"
                    />
                  </div>
                )}
                <RiDeleteBin2Fill
                  className="icon-color-delete"
                  onClick={() => deleteMutation(id)}
                />
                <div className="hidden md:inline-block">
                  {showDescription ? (
                    <IoMdArrowDropup
                      onClick={() => setShowDescription(!showDescription)}
                    />
                  ) : (
                    <IoMdArrowDropdown
                      onClick={() => setShowDescription(!showDescription)}
                    />
                  )}
                </div>
              </div>
            </div>
            <p className="text-lg font-thin italic">
              <span className="font-thin italic">{` Created ${dayjs(
                createdAt
              ).fromNow()}`}</span>
            </p>
            {showDescription && (
              <article className="prose pt-4 text-lg lg:prose-xl">
                <ReactMarkdown>{description}</ReactMarkdown>
              </article>
            )}
          </div>
        </li>
      )}
      <Toaster />
    </Fragment>
  );
}
