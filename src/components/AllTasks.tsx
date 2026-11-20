import { useState } from "react";
import type { Todo } from "../api/apiTodo";
import Task from "./Task";

interface AllTasksProps {
  todos: Todo[];
  onDelete: (id: number | string) => void;
  onToggle: (id: number | string, completed: boolean) => void;
  onUpdate: () => void;
}

type Filter = "all" | "active" | "completed";

function AllTasks({ todos, onDelete, onToggle, onUpdate }: AllTasksProps) {
  const [filter, setFilter] = useState<Filter>("all");

  let visibleTodos: Todo[] = [];

  if (filter === "all") {
    visibleTodos = todos;
  } else if (filter === "active") {
    visibleTodos = todos.filter((t) => !t.completed);
  } else {
    visibleTodos = todos.filter((t) => t.completed);
  }

  return (
    <div>
      <ul>
        {visibleTodos.map((todo) => (
          <Task
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
      <div style={{ display: "flex" }}>
        <button onClick={()=> setFilter('all')}>Все</button>
        <button  onClick={()=> setFilter('active')}>Активные</button>
        <button  onClick={()=> setFilter('completed')}>Готовые</button>
      </div>
    </div>
  );
}

export default AllTasks;
