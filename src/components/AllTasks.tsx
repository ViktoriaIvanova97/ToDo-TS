
import axios from "axios";
import { useState, useEffect } from "react";
import { getAllTasks, type Todo } from "../api/apiTodo";
import Task from "./Task";

function AllTasks() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllTasks();
        console.log('Пришло с сервера:', data);
        setTodos(data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Ошибка загрузки задач");
        } else {
          setError("Неизвестная ошибка");
        }
      }
    };
    load();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;


  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <Task key={todo.id} todo={todo}/>
        ))}
      </ul>
    </div>
  );
}

export default AllTasks;
