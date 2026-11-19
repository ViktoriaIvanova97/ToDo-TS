import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${BASE_URL}/auth/register`,
    data,
  );
  localStorage.setItem("token", response.data.access_token);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${BASE_URL}/auth/login`,
    data,
  );
  localStorage.setItem("token", response.data.access_token);
  return response.data;
};
