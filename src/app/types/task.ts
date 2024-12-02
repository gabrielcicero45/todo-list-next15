export type Task = {
    id: number;
    title: string;
    description: string;
    categoryId: number | null;
    completed: boolean;
    createdAt: Date;
  };
  