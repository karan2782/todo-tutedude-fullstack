import React, { useState } from "react";
import "./CreateTodo.css";
import { useTodoContext } from "./provider/TodoProvider";
const CreateTodo = () => {
  const { fetchTodos } = useTodoContext();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(null);

  const createNewTodo = async (todoData) => {
    try {
      const res = await fetch(
        "https://tutedude-todo-backend.onrender.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todoData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "something went wrong! while creating todo!");
      } else {
        alert("Todo created successfully!");
        fetchTodos();
        setTitle("");
        setStatus(null);
      }
    } catch (error) {
      alert(error.message || "something went wrong! while creating todo!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("Title is required");
      return;
    }
    console.log(title, status);
    createNewTodo({ title, completed: status ? true : false });
  };

  const handleStautsChange = (e) => {
    setStatus(e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <h1>Creat New Todo Task</h1>
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
          <label>Status: </label>
          <select value={status} onChange={handleStautsChange}>
            <option value={false}>Select Status</option>
            <option value={true}>Completed</option>
            <option value={false}>Pending</option>
          </select>
        </div>
        <button type="submit">Create Todo</button>
      </form>
    </div>
  );
};

export default CreateTodo;
