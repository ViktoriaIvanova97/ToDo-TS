import type { Todo } from "../api/apiTodo"


interface TodoItemProps {
  todo: Todo;
}


function Task({todo}:TodoItemProps) {
  return (
    <li>
      <p>{todo.description}</p>
      <span>{todo.completed ? '✅ Выполнено' : '⏳ В работе'}</span>
    </li>
  );

}

export default Task