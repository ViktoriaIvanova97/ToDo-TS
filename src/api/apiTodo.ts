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

export const getAllTasks = async (): Promise<Todo[]> => {
  const response = await axios.get<{data:Todo[]}>(`${BASE_URL}/todos`, {
    headers: authHeaders(),
  });
  return response.data.data;
};
