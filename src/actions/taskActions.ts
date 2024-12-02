"use server";
import { prisma } from "@/lib/prisma";

export async function createTask(data: { title: string; description: string }) {
  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
    },
  });
  
}

export async function getTasks() {
  return prisma.task.findMany({ orderBy: { createdAt: "desc" } });
}

export async function updateTask(id: number, updates: { completed: boolean }) {
  return prisma.task.update({
    where: { id },
    data: updates,
  });
}

export async function deleteTask(id: number) {
  return prisma.task.delete({ where: { id } });
}
