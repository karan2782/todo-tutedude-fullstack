import { useTodoContext } from "./provider/TodoProvider";
import "./App.css";
import CreateTodo from "./CreateTodo";
import { useState } from "react";
import EditTodo from "./EditTodo";

function App() {
  const { todos, error, loading, fetchTodos } = useTodoContext();
  const [isEditing, setIsEditing] = useState(null);
  const deleteTodo = async (id) => {
    try {
      const res = await fetch(
        `https://tutedude-todo-backend.onrender.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "something went wrong! while deleting todo!");
      } else {
        alert("Todo deleted successfully!");
        fetchTodos();
      }
    } catch (error) {
      alert(error.message || "something went wrong! while deleting todo!");
    }
  };

  const confirmDelete = (id)=> {
    if(window.confirm("Are you really want to delete it?")){
      deleteTodo(id);
    } else{
      return;
    }
  }
  
  return (
    <div className="todoContainer">
      <div>
        <CreateTodo />
      </div>
      {loading && <h3>Loading...</h3>}
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      {!loading && !error && todos.length === 0 && <h3>No todos found!</h3>}
      {!loading && !error && todos.length > 0 && (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className="todoItem">
              <p>{todo.title}</p>
              <p>Status: {todo.completed ? "completed" : "pending"}</p>
              <div className="btnCont">
                <button className="editBtn" onClick={()=>setIsEditing(todo._id)}>Edit</button>
                <button className="delBtn" onClick={() => confirmDelete(todo._id)}>
                  Delete
                </button>
              </div>
              <div>
                {isEditing===todo._id && <EditTodo id={todo._id} setIsEditing={setIsEditing} />}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
