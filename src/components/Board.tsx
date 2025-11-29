"use client";

import { useEffect, useState } from "react";
import { Task } from "@/lib/supabase";
import TaskColumn from "./TaskColumn";

type PriorityFilter = "ALL" | "HIGH" | "MEDIUM" | "LOW";

type BoardProps = {
  tasks: Task[];
  priorityFilter: PriorityFilter;
  onTasksMoved: (tasks: Task[]) => void;
};

export default function Board({
  tasks,
  priorityFilter,
  onTasksMoved,
}: BoardProps) {
  const [localTasks, setLocalTasks] = useState(tasks);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const visibleTasks =
    priorityFilter === "ALL"
      ? localTasks
      : localTasks.filter((t) => t.priority === priorityFilter);

  const todoTasks = visibleTasks.filter((t) => t.status === "TODO");
  const wipTasks = visibleTasks.filter((t) => t.status === "WIP");
  const doneTasks = visibleTasks.filter((t) => t.status === "DONE");

  const handleTaskUpdate = (updatedTask: Task) => {
    const updated = localTasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setLocalTasks(updated);
    onTasksMoved(updated);
  };

  const handleTaskDelete = (id: string) => {
    const updated = localTasks.filter((t) => t.id !== id);
    setLocalTasks(updated);
    onTasksMoved(updated);
  };

  return (
    <div className="board">
      <TaskColumn
        title="📝 To Do"
        tasks={todoTasks}
        status="TODO"
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
      />
      <TaskColumn
        title="⚡ In Progress"
        tasks={wipTasks}
        status="WIP"
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
      />
      <TaskColumn
        title="✅ Done"
        tasks={doneTasks}
        status="DONE"
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
}
