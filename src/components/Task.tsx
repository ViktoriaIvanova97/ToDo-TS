import type { Todo } from "../api/apiTodo";
import { useState } from "react";
import { updateTodoApi } from "../api/apiTodo";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number | string) => void;
  onToggle: (id: number | string, completed: boolean) => void;
  onUpdate:()=>void
}

function Task({ todo, onDelete, onToggle, onUpdate }: TodoItemProps) {
  const [change, setChange] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setError("Введите название задачи");
      return;
    }
    try {
      
      await updateTodoApi(todo.id,{title:newTitle, description:newDescription});
      setChange(false)
      setError(null);
     onUpdate()
    } catch (err: unknown) {
      setError("Не удалось обновить задачу");
    }
  };

  return !change ? (
    <li style={{ display: "flex" }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
      />
      <p
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#888" : "#000",
          margin: 0,
        }}
      >
        {todo.title} - {todo.description}
      </p>
      <button onClick={() => setChange(true)}>Изменить</button>
      <button onClick={() => onDelete(todo.id)}>Удалить</button>
    </li>
  ) : (
    <form onSubmit={handleEdit}>
      <input
        type="text"
        placeholder="Название"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Описание"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button type="submit">Добавить</button>
      <button type="button" onClick={() => setChange(false)}>Отменить</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default Task;
