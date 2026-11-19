import type { Todo } from "../api/apiTodo";

interface TodoItemProps {
  todo: Todo;
}

function Task({ todo }: TodoItemProps) {
  return (
    <li style={{display:'flex'}}>
      <input type="checkbox" />
      <p>{todo.title}</p> - 
      <p>{todo.description}</p>
      <button>Изменить</button>
    </li>
  );
}

export default Task;
