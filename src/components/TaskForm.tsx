import { getCategories } from "@/actions/categoryActions";
import { useEffect, useState } from "react";

export default function TaskForm({ onAdd }: { onAdd: (title: string, description: string, categoryId:number | null) => void; }) {
  const [categories, setCategories] = useState<{id:number, name: string}[]>();
  
  async function handleCreate(formData: FormData) {

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const categoryId = formData.get("category") as string;

    const parsedCategoryId = categoryId ? parseInt(categoryId, 10) : null;

    if (!title || !description) {
      throw new Error("Both title and description are required!");
    }

    onAdd(title, description,parsedCategoryId);

  }

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <form action={handleCreate} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          className="select"
        >
          <option value="">None</option>
          {categories && categories.map((category: { id: number; name: string; }) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Create Task
      </button>
    </form>
  );
}
