import axios from "axios";

const AUTH_URL = import.meta.env.VITE_AUTH_URL;

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
    `${AUTH_URL}/auth/register`,
    data,
  );
  localStorage.setItem("token", response.data.access_token);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${AUTH_URL}/auth/login`,
    data,
  );
  localStorage.setItem("token", response.data.access_token);
  return response.data;
};
