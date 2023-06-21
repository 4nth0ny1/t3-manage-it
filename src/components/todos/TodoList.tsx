import { api } from "../../utils/api";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  // const {
  //   data: todos,
  //   isLoading,
  //   isError,
  // } = api.todo.getAllTodos.useQuery({ sprintId });

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Something went wrong</div>;

  const fakeTodos = [
    {
      id: "1",
      name: "Fix the Todo List",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. ",
      createdAt: "",
      updatedAt: "",
      sprintId: "",
      projectId: "",
      userId: "",
    },
    {
      id: "2",
      name: "Get the data correctly",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. ",
      createdAt: "",
      updatedAt: "",
      sprintId: "",
      projectId: "",
      userId: "",
    },
    {
      id: "3",
      name: "Lorem ipsum",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. ",
      createdAt: "",
      updatedAt: "",
      sprintId: "",
      projectId: "",
      userId: "",
    },
    {
      id: "4",
      name: "Lorem Ipsum Book, Lorem Ipsum Book, Lorem Ipsum Book, Fix the Todo List",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. ",
      createdAt: "",
      updatedAt: "",
      sprintId: "",
      projectId: "",
      userId: "",
    },
  ];

  return (
    <ul className="flex flex-row flex-wrap text-2xl">
      {fakeTodos?.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}
