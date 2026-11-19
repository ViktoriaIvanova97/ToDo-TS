import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface CreateTodoDto {
  title: string;
  description: string;
}

export const getAllTasks = async (): Promise<Todo[]> => {
  const response = await axios.get<{ data: Todo[] }>(`${BASE_URL}/todos`, {
    headers: authHeaders(),
  });
  return response.data.data;
};

export const createTodo = async (data: CreateTodoDto): Promise<Todo> => {
  const response = await axios.post<Todo>(`${BASE_URL}/todos`, data, {
    headers: authHeaders(),
  });
  return response.data;
};


export const deleteTask =async(id:number | string): Promise<void>=>{
  await axios.delete(`${BASE_URL}/todos/${id}`,{
    headers: authHeaders()
  })
}
