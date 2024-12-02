import { getTasks } from "@/actions/taskActions";
import TaskList from "@/components/TaskList";

export default async function HomePage() {
  const tasks = await getTasks();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TaskList initialTasks={tasks} />
    </main>
  );
}
