"use server";
import { prisma } from "@/lib/prisma";

export async function createCategory(name: string) {
  return prisma.category.create({
    data: { name },
  });
}

export async function getCategory(categoryId: number) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { name: true }, 
    });
    return category?.name || "None";
}

export async function getCategories() {
  return prisma.category.findMany();
}
