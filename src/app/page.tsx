"use client";

import { useState, useEffect } from "react";
import { Task } from "@/lib/supabase";
import { getTasks } from "@/lib/api";
import Board from "@/components/Board";
import AddTaskForm from "@/components/AddTaskForm";
import FilterToggle, { PriorityFilter } from "@/components/FilterToggle";
import "../styles/style.css";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("ALL");

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>🚀 FlowBoard</h1>
        <p>Personal Kanban для управления задачами</p>
      </header>

      <div className="controls">
        <AddTaskForm
          onTaskAdded={(newTask: Task) => setTasks([newTask, ...tasks])}
        />
        <FilterToggle value={priorityFilter} onChange={setPriorityFilter} />
      </div>

      {loading ? (
        <p className="loading">Загружаем задачи...</p>
      ) : (
        <Board
          tasks={tasks}
          priorityFilter={priorityFilter}
          onTasksMoved={setTasks}
        />
      )}
    </div>
  );
}
