import { getTasks } from "@/actions/taskActions";
import TaskList from "@/components/TaskList";
import ToggleThemeButton from "@/components/ToggleThemeButton";

export default async function HomePage() {
  const tasks = await getTasks();

  return (
      <main className="container mx-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
        <nav className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">Todo List</h1>
          <ToggleThemeButton />
        </nav>
        <TaskList initialTasks={tasks} />
      </main> 
  );
}
