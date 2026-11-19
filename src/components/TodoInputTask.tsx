import { useState } from "react";
import type { FormEvent } from "react";
import { createTodo, type CreateTodoDto } from "../api/apiTodo";

interface TodoInputTaskProps {
  onCreated: () => void;
}

function TodoInputTask({ onCreated }: TodoInputTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Введите название задачи");
      return;
    }
    try {
      const payload: CreateTodoDto = { title, description };
      await createTodo(payload);
      setTitle("");
      setDescription("");
      setError(null);
      onCreated();
    } catch (err: unknown) {
      setError("Не удалось создать задачу");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Добавить</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default TodoInputTask;
