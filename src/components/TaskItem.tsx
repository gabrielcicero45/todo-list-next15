import { updateTask } from "@/actions/taskActions";
import { Task } from "@/app/types/task";
import { useState } from "react";


export default function TaskItem({ initialTask, onDelete }: { initialTask: Task, onDelete: (task: Task) => void  }) {
  const [task, setTask] = useState(initialTask);
  async function toggleComplete() {
    const updatedTask = { ...task, completed: !task.completed };

    setTask((prev)=> prev.id === updatedTask.id ? updatedTask : prev)
    try{
      await updateTask(task.id, { completed: !task.completed });
    }catch (error) {
      console.error('Failed to update task:', error);

      setTask((prev)=> prev.id === updatedTask.id ? updatedTask : prev)
    }
  }

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold">{task.title}</h2>
      <p>{task.description}</p>
      <div className="flex gap-2 mt-2">
        <form action={toggleComplete}>
          <button
            type="submit"
            className={`px-4 py-2 rounded ${
              task.completed ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            {task.completed ? "Completed" : "Mark Complete"}
          </button>
        </form>
        <form action={()=> onDelete(task)}>
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
