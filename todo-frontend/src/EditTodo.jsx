import React, { useEffect, useState } from "react";
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
        alert(data.message || "something went wrong! while fetching todo!");
      } else {
        setTitle(data.todo.title);
        setStatus(data.todo.completed);

      }
    } catch (error) {
      alert(error.message || "something went wrong! while fetching todo!");
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todoData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "something went wrong! while updating todo!");
      } else {
        alert("Todo updated successfully!");
        fetchTodos();
        setIsEditing(null);
      }
    } catch (error) {
      alert(error.message || "something went wrong! while updating todo!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("Title is required");
      return;
    }
    updateTodo({ title, completed: status ? true : false });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label>Title: </label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label>Completed: </label>
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </div>
        <button>Update Todo</button>
      </form>
    </div>
  );
};

export default EditTodo;
