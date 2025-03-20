import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const { data } = await getTasks();
        setTasks(data);
    };

    const addTask = async () => {
        await createTask({ title: task });
        setTask("");
        fetchTasks();
    };

    const toggleTask = async (id, completed) => {
        await updateTask(id, { completed: !completed });
        fetchTasks();
    };

    const removeTask = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };

    return (
        <div className="container mt-5">
            <h2>CRUD Task Manager</h2>
            <div className="input-group my-3">
                <input type="text" className="form-control" placeholder="New Task"
                    value={task} onChange={(e) => setTask(e.target.value)} />
                <button className="btn btn-primary" onClick={addTask}>Add</button>
            </div>
            <ul className="list-group">
                {tasks.map(t => (
                    <li key={t._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                            {t.title}
                        </span>
                        <div>
                            <button className="btn btn-sm btn-success me-2" onClick={() => toggleTask(t._id, t.completed)}>
                                {t.completed ? "Undo" : "Complete"}
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => removeTask(t._id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
