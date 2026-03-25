import React, { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>출장 일정 관리</h1>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="일정 입력"
        />
        <button onClick={addTask}>추가</button>
      </div>

      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            <span
              onClick={() => toggleTask(i)}
              style={{
                textDecoration: task.done ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(i)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
