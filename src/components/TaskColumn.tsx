"use client";

import { Task } from "@/lib/supabase";
import TaskCard from "./TaskCard";

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  status: "TODO" | "WIP" | "DONE";
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (id: string) => void;
};

export default function TaskColumn({
  title,
  tasks,
  status,
  onTaskUpdate,
  onTaskDelete,
}: TaskColumnProps) {
  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <div className="column-count">
        {tasks.length} {tasks.length === 1 ? "задача" : "задач"}
      </div>

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="empty-state">Нет задач</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              currentStatus={status}
              onTaskUpdate={onTaskUpdate}
              onTaskDelete={onTaskDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
