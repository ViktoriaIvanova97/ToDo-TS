import AllTasks from "./AllTasks";
import TodoInputTask from "./TodoInputTask";

function TodoList() {
  return <div>
    <h2>Мой ToDo</h2>
    <TodoInputTask/>
    <AllTasks/>
  </div>;
}

export default TodoList;
