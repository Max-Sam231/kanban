"use client";

import { Task } from "@/lib/supabase";
import { createTask } from "@/lib/api";
import { useState } from "react";

type AddTaskFormProps = {
  onTaskAdded: (task: Task) => void;
};

type Priority = "LOW" | "MEDIUM" | "HIGH";

type FormState = {
  title: string;
  description: string;
  priority: Priority;
  due_date: string;
};

export default function AddTaskForm({ onTaskAdded }: AddTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    title: "",
    description: "",
    priority: "MEDIUM",
    due_date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    try {
      const newTask = await createTask({
        title: formData.title,
        description: formData.description || null,
        priority: formData.priority,
        due_date: formData.due_date || null,
        status: "TODO",
      });

      onTaskAdded(newTask);
      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        due_date: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn-add-task" onClick={() => setIsOpen(!isOpen)}>
        ➕ Новая задача
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Создать задачу</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Название задачи *"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="form-input"
              />

              <textarea
                placeholder="Описание (опционально)"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="form-textarea"
              />

              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as Priority,
                  })
                }
                className="form-select"
              >
                <option value="LOW">🟢 Low</option>
                <option value="MEDIUM">🟡 Medium</option>
                <option value="HIGH">🔴 High</option>
              </select>

              <input
                type="date"
                value={formData.due_date}
                onChange={(e) =>
                  setFormData({ ...formData, due_date: e.target.value })
                }
                className="form-input"
              />

              <div className="form-buttons">
                <button type="submit" disabled={loading} className="btn-submit">
                  {loading ? "Создаём..." : "Создать"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-cancel"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
