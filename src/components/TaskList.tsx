"use client";

import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { Task } from "@/app/types/task";
import { createTask, deleteTask, getTasks } from "@/actions/taskActions";
import { createSwapy } from "swapy";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!initialTasks || initialTasks.length === 0) {
      async function fetchTasks() {
        try {
          const fetchedTasks = await getTasks();
          setTasks(fetchedTasks);
        } catch (error) {
          console.error("Failed to fetch tasks:", error);
        }
      }

      fetchTasks();
    }
  }, [initialTasks]);

  const filteredTasks =
    searchQuery.length >= 2
      ? tasks.filter((task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : tasks;

  async function handleCreate(
    title: string,
    description: string,
    categoryId: number | null
  ) {
    const optimisticTask: Task = {
      id: -(tasks.length + 1),
      title,
      description,
      categoryId,
      completed: false,
      createdAt: new Date(),
    };

    setTasks((prev) => [optimisticTask, ...prev]);

    try {
      const createdTask = await createTask({ title, description, categoryId });

      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === createdTask.id) {
            return {
              ...task,
              categoryId: optimisticTask.categoryId ?? null,
            };
          }
          return task;
        })
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

  useEffect(() => {
    const container = document.querySelector(".list");

    if (container) {
      const swapy = createSwapy(container);

      swapy.onSwap(({ data }) => {
        localStorage.setItem("slotItem", JSON.stringify(data.object));
      });

      return () => {
        swapy.destroy();
      };
    }
    return;
  }, []);
  const router = useRouter();
  
  return (
    <>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm
          onAdd={(title, description, categoryId) => {
            handleCreate(title, description, categoryId);
          }}
        />
      </Modal>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create task
      </button>
      <button onClick={() => router.push('/categories/new')} className="bg-blue-500 text-white p-2 rounded">
        New Category
      </button>

      <div className="my-5">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full p-2 border rounded shadow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-5 list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              initialTask={task}
              onDelete={deleteTaskOptimistically}
            />
          ))}
        </div>
      ) : (
        <p>No tasks found</p>
      )}
    </>
  );
}
