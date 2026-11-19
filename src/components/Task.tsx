import type { Todo } from "../api/apiTodo";

interface TodoItemProps {
  todo: Todo;
  onDelete:(id:number|string)=>void
}

function Task({ todo, onDelete }: TodoItemProps) {
  return (
    <li style={{display:'flex'}}>
      <input type="checkbox" />
      <p>{todo.title}</p> - 
      <p>{todo.description}</p>
      <button>Изменить</button>
      <button onClick={()=>onDelete(todo.id)}>Удалить</button>
    </li>
  );
}

export default Task;
