import RegisterForm from "./components/RegisterForm";
import { Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterForm />} />
      <Route path="/todo" element={<TodoList />} />
    </Routes>
  );
}

export default App;
