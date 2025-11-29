"use client";

import { Task } from "@/lib/supabase";
import { moveTask, deleteTask } from "@/lib/api";
import { useState } from "react";

type TaskCardProps = {
  task: Task;
  currentStatus: "TODO" | "WIP" | "DONE";
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (id: string) => void;
};

export default function TaskCard({
  task,
  currentStatus,
  onTaskUpdate,
  onTaskDelete,
}: TaskCardProps) {
  const [isMoving, setIsMoving] = useState(false);

  const getPriorityColor = (priority: string): string => {
    const colors: Record<string, string> = {
      HIGH: "#FF4444",
      MEDIUM: "#FFB84D",
      LOW: "#999999",
    };
    return colors[priority] || "#999999";
  };

  const getStatusLabel = (status: "TODO" | "WIP" | "DONE"): string => {
    const labels: Record<string, string> = {
      TODO: "📝 To Do",
      WIP: "⚡ In Progress",
      DONE: "✅ Done",
    };
    return labels[status];
  };

  const getAvailableStatuses = (): ("TODO" | "WIP" | "DONE")[] => {
    const allStatuses: ("TODO" | "WIP" | "DONE")[] = ["TODO", "WIP", "DONE"];
    return allStatuses.filter((s) => s !== currentStatus);
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date();

  const handleMove = async (newStatus: "TODO" | "WIP" | "DONE") => {
    if (isMoving) return;
    setIsMoving(true);

    // Мгновенное обновление UI
    const updatedTask = { ...task, status: newStatus };
    onTaskUpdate(updatedTask);

    try {
      await moveTask(task.id, newStatus);
    } catch (error) {
      console.error("Error moving task:", error);
      // Откатываем изменения при ошибке
      onTaskUpdate(task);
    } finally {
      setIsMoving(false);
    }
  };

  const handleDelete = () => {
    // Мгновенное удаление из UI
    onTaskDelete(task.id);

    // Удаление на сервере в фоне
    deleteTask(task.id).catch((error) => {
      console.error("Error deleting task:", error);
      // При ошибке можно показать уведомление, но не возвращаем карточку
    });
  };

  const formattedDate = task.due_date
    ? new Date(task.due_date).toLocaleDateString("ru-RU", {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div
      className="task-card"
      style={{
        borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
        opacity: isMoving ? 0.7 : 1,
      }}
    >
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <button className="btn-delete" onClick={handleDelete}>
          ✕
        </button>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span className={`priority priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
        {formattedDate && (
          <span className={`due-date ${isOverdue ? "overdue" : ""}`}>
            📅 {formattedDate}
          </span>
        )}
      </div>

      <div className="task-actions">
        {getAvailableStatuses().map((status) => (
          <button
            key={status}
            className={`btn-move-status btn-move-${status.toLowerCase()}`}
            onClick={() => handleMove(status)}
            disabled={isMoving}
          >
            {getStatusLabel(status)}
          </button>
        ))}
      </div>
    </div>
  );
}
