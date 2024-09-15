import { successReturn } from "../_lib/controllerReturnGenerator";
import prisma from "../_lib/prisma";

export async function allTestCategories(name, page) {
  const count = await prisma.testCategory.count({
    where: { name: { contains: name } },
  });
  const result = await prisma.testCategory.findMany({
    where: { name: { contains: name } },
    take: 20,
    skip: (Number(page) - 1) * 20,
  });
  return successReturn({ categories: result, count: count });
}

export async function categoriesWithTests() {
  const result = await prisma.testCategory.findMany({
    include: { Test: true },
  });

  return successReturn(result);
}

export async function listTestCategories() {
  const result = await prisma.testCategory.findMany();
  return successReturn(result);
}

export async function getTestCategory(id) {
  const result = await prisma.testCategory.findUnique({ where: { id: id } });
  return successReturn(result);
}

export async function createTestCategory(data) {
  const result = await prisma.testCategory.create({
    data: {
      name: data.name,
    },
  });
  return successReturn(result);
}
export async function updateTestCategory(id, data) {
  await prisma.testCategory.update({
    where: { id: id },
    data: {
      name: data.name,
    },
  });
  return successReturn();
}

export async function deleteTestCategory(id) {
  await prisma.testCategory.delete({ where: { id: id } });
  return successReturn();
}

export async function uniqueName(name) {
  const result = await prisma.testCategory.findFirst({ where: { name: name } });
  return successReturn(result);
}
