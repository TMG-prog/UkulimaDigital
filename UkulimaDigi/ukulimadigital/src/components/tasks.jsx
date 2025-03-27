import { useState, useEffect } from "react";
import "./tasks.css";

export default function ToDoList({ updateToDoTasks }) {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [date, setDate] = useState("");
    const [urgency, setUrgency] = useState("Medium");

    useEffect(() => {
        if (typeof updateToDoTasks === "function") {
            updateToDoTasks(tasks.map(t => t.text));
        }
    }, [tasks, updateToDoTasks]);

    const addTask = () => {
        if (task.trim() !== "" && date.trim() !== "") {
            setTasks([...tasks, { text: task, date, urgency, completed: false }]);
            setTask("");
            setDate("");
            setUrgency("Medium");
        }
    };

    const toggleComplete = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
      <div className="todo-container">
        <h2 className="todo-title">To-Do List</h2>
        <div className="todo-inputs">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Task Description"
            className="todo-input"
          />
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="todo-input"
          />
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="todo-select"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={addTask} className="todo-button">Add</button>
        </div>
        <div>
          {tasks.map((t, index) => (
            <div key={index} className={`todo-task ${t.completed ? "completed" : ""}`}>
              <div>
                <p className={`todo-task-text ${t.completed ? "completed" : ""}`}>{t.text}</p>
                <p className="todo-task-date">📅 {t.date}</p>
                <p className={`todo-task-urgency ${t.urgency === "High" ? "urgency-high" : t.urgency === "Medium" ? "urgency-medium" : "urgency-low"}`}>
                  ⚠ {t.urgency}
                </p>
              </div>
              <div className="todo-buttons">
                <button onClick={() => toggleComplete(index)} className="complete-button">✔</button>
                <button onClick={() => removeTask(index)} className="delete-button">🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}