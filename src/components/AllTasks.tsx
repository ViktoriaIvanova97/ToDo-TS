import type { Todo } from "../api/apiTodo";
import Task from "./Task";

interface AllTasksProps {
  todos: Todo[];
}

function AllTasks({ todos }: AllTasksProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <Task key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default AllTasks;
