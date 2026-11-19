import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, login } from "../api/apiAutorith";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  password: string;
}

function RegisterForm() {
  const [reg, setReg] = useState(true);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (reg) {
        await register({
          email: form.email,
          password: form.password,
          name: form.name,
        });
      } else {
        await login({
          email: form.email,
          password: form.password,
        });
      }
      console.log("Успешно! Токен сохранён");
      navigate("/todo");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Ошибка сервера");
      } else {
        setError("Что-то пошло не так");
      }
    }
  };

  return reg ? (
    <div>
      <div>
        <button onClick={() => setReg(false)}>Войти</button>
      </div>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Логин:</p>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>E-mail:</p>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Пароль:</p>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Пол:</p>
          <select name="" id="">
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div>
          <p>Возраст:</p>
          <input type="text" />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  ) : (
    <div>
      <div>
        <button onClick={() => setReg(true)}>Зарегистрироваться</button>
      </div>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>E-mail:</p>
          <input type="email" 
          name='email'
          value={form.email} onChange={handleChange} />
        </div>
        <div>
          <p>Пароль:</p>
          <input
            type="password"
            name='password'
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Войти</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default RegisterForm;
