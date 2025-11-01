import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTodos = async ()=>{
        try {
            setLoading(true);
            const res = await fetch("https://tutedude-todo-backend.onrender.com/todos");
            const data = await res.json();
            if(!res.ok){
                setError(data.message || "something went wrong!");
                setLoading(false);
                setTodos([]);

            }else{
                setTodos(data.todos);
                setLoading(false);
                setError(null);
            }
        } catch (error) {
            setError(error.message || "something went wrong!");
            setLoading(false);
            setTodos([]);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, [])
    return(
        <TodoContext.Provider value={{todos, error, loading, fetchTodos}} >
            {children}
        </TodoContext.Provider>
    )
}

export const useTodoContext = ()=>{
    const context = useContext(TodoContext);
    if(context === undefined){
        throw new Error("useTodoContext should be used inside TodoProvider")
    }
    return context;
}