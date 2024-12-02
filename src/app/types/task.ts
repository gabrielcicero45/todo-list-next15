export type Task = {
    id: number;
    title: string;
    description: string;
    categoryId?: number;
    completed: boolean;
    createdAt: Date;
  };
  