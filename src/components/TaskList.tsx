"use client";
import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { Task } from "@/app/types/task";
import { createTask, deleteTask } from "@/actions/taskActions";

export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);

  async function handleCreate(title: string, description: string) {
    const optimisticTask: Task = {
      id: -(tasks.length + 1),
      title,
      description,
      completed: false,
      createdAt: new Date(),
    };

    setTasks((prev) => [optimisticTask, ...prev]);

    try {
      const createdTask = await createTask({ title, description });

      setTasks((prev) =>
        prev.map((task) => (task.id === optimisticTask.id ? createdTask : task))
      );
    } catch (error) {
      console.error("Failed to create task:", error);

      setTasks((prev) => prev.filter((task) => task.id !== optimisticTask.id));
    }
  }

  async function deleteTaskOptimistically(task: Task) {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));

    try {
      await deleteTask(task.id);
    } catch (error) {
      console.error("Error deleting task:", error);

      setTasks((prev) => [...prev, task]);
    }
  }

  return (
    <div className="grid gap-4">
      <TaskForm
        onAdd={(title, description) => {
          handleCreate(title, description);
        }}
      />
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          initialTask={task}
          onDelete={deleteTaskOptimistically}
        />
      ))}
    </div>
  );
}
