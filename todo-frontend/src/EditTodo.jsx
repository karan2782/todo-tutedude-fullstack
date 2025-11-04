import { useEffect, useState } from "react";
import { useTodoContext } from "./provider/TodoProvider";
const EditTodo = ({ id, setIsEditing }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);
  const { fetchTodos } = useTodoContext();
  const fetchTodo = async (id) => {
    try {
      const res = await fetch(
        `https://tutedude-todo-backend.onrender.com/todos/${id}`
      );
      const data = await res.json();
      console.log("edit data:", data);
      if (!res.ok) {
        alert(data.message);
      } else {
        setTitle(data.todo.title);
        setStatus(data.todo.completed);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchTodo(id);
  }, []);
  const updateTodo = async (todoData) => {
    try {
      const res = await fetch(
        `https://tutedude-todo-backend.onrender.com/todos/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todoData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
      } else {
        alert("todo is updated successfully");
        fetchTodos();
        setIsEditing(null);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("title is require");
      return;
    }
    updateTodo({ title, completed: status ? true : false });
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        {" "}
        <div className="inputContainer">
          {" "}
          <label>title:</label>{" "}
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
        </div>{" "}
        <div className="inputContainer">
          {" "}
          <label>completed:</label>{" "}
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />{" "}
        </div>{" "}
        <button>update</button>{" "}
      </form>{" "}
    </div>
  );
};
export default EditTodo;
