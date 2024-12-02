
import { createCategory } from "@/actions/categoryActions";

export default function NewCategoryPage() {


  async function handleSubmit(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;

    try {
      await createCategory(name);
      
    } catch (error) {
      console.error(error);
      alert("Erro ao criar a categoria. Verifique o console para mais detalhes.");
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Nova Categoria</h1>
      <form action={handleSubmit}>
        <label className="block mb-2">
          Nome da Categoria:
          <input
            type="text"
            name="name"
            className="border p-2 rounded w-full"
            required
          />
        </label>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Salvar Categoria
        </button>
      </form>
    </div>
  );
}
