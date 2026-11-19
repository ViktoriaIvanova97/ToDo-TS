import type { Todo } from "../api/apiTodo";
import Task from "./Task";

interface AllTasksProps {
  todos: Todo[];
  onDelete:(id:number|string)=>void
}

function AllTasks({ todos, onDelete }: AllTasksProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <Task key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default AllTasks;
