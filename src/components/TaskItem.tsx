import { getCategory } from "@/actions/categoryActions";
import { updateTask } from "@/actions/taskActions";
import { Task } from "@/app/types/task";
import { useEffect, useState } from "react";

export default function TaskItem({
  initialTask,
  onDelete,
}: {
  initialTask: Task;
  onDelete: (task: Task) => void;
}) {
  const [task, setTask] = useState(initialTask);
  const [categoryName, setCategoryName] = useState<string>("Loading...");
  
  useEffect(() => {
    if (task.categoryId) {
      getCategory(task.categoryId).then((name) => setCategoryName(name));
    } else {
      setCategoryName("Uncategorized");
    }
  }, [task.categoryId]);

  async function toggleComplete() {
    const updatedTask = { ...task, completed: !task.completed };

    setTask((prev) => (prev.id === updatedTask.id ? updatedTask : prev));
    try {
      await updateTask(task.id, { completed: !task.completed });
    } catch (error) {
      console.error("Failed to update task:", error);

      setTask((prev) => (prev.id === updatedTask.id ? updatedTask : prev));
    }
  }

  return (
    <div className="bg-gray-100 p-4 border rounded shadow" data-swapy-item={task.title}>
      <p className="font-bold">
        Category: {categoryName}
      </p>
      <h2 className={`text-xl font-semibold ${task.completed ? "line-through text-gray-500":""}`}>{task.title}</h2>
      <p className={`${task.completed ? "line-through text-gray-500":""}`}>{task.description}</p>
      <div className="flex gap-2 mt-2">
        <form action={toggleComplete}>
          <button
            type="submit"
            className={`px-4 py-2 rounded ${
              task.completed ? "bg-green-500" : "bg-gray-300"
            }`}
            disabled={task.completed}
          >
            {task.completed ? "Completed" : "Mark Complete"}
          </button>
        </form>
        <form action={() => onDelete(task)}>
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
