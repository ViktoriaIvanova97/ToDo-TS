import { useState, useEffect } from "react";
import axios from "axios";
import {
  getAllTasks,
  type Todo,
  deleteTask,
  toggleTodoApi,
} from "../api/apiTodo";
import AllTasks from "./AllTasks";
import TodoInputTask from "./TodoInputTask";

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await getAllTasks();
      setTodos(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Ошибка загрузки задач");
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  const deleteTodo = async (id: number | string) => {
    try {
      await deleteTask(id);
      load();
    } catch (err: unknown) {
      setError("Не удалось удалить задачу");
    }
  };

  const toggleTodo = async(id:number|string, completed:boolean)=>{
    try {
      await toggleTodoApi({id, completed:!completed})
      load()
    } catch (err:unknown) {
      setError("Не удалось обновить задачу")
      
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Мои Todo</h2>
      <TodoInputTask onCreated={load} />
      <AllTasks todos={todos} onDelete={deleteTodo} onToggle={toggleTodo}onUpdate={load} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default TodoList;
