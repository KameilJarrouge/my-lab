import { successReturn } from "../_lib/controllerReturnGenerator";
import prisma from "../_lib/prisma";

export async function allTests(name, categoryId, page) {
  let conditions = {};

  if (name !== "") conditions["name"] = { contains: name };

  if (categoryId !== "الجميع" && !isNaN(Number(categoryId)))
    conditions["category"] = { id: Number(categoryId) };

  const count = await prisma.test.count({
    where: { ...conditions },
  });

  const result = await prisma.test.findMany({
    where: { ...conditions },
    include: { category: true },
    take: 20,
    skip: (Number(page) - 1) * 20,
  });
  return successReturn({ tests: result, count: count });
}

export async function listTests() {
  const result = await prisma.test.findMany({
    select: { id: true, name: true },
  });
  return successReturn(result);
}

export async function listTestsWithCategories() {
  const result = await prisma.test.findMany({
    include: { category: true },
  });
  return successReturn(result);
}

export async function getTest(id) {
  const result = await prisma.test.findUnique({ where: { id: id } });
  return successReturn(result);
}

export async function getTestWithCategory(id) {
  const result = await prisma.test.findUnique({
    where: { id: id },
    include: { category: true },
  });
  return successReturn(result);
}

export async function createTest(data) {
  await prisma.test.create({
    data: {
      name: data.name,
      units: data.units,
      testCategoryId: data.testCategoryId,
      template: JSON.stringify(data.template),
    },
  });
  return successReturn();
}

export async function updateTest(id, data) {
  await prisma.test.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      units: data.units,
      testCategoryId: data.testCategoryId,
      template: JSON.stringify(data.template),
    },
  });
  return successReturn();
}

export async function deleteTest(id) {
  await prisma.test.delete({
    where: {
      id: id,
    },
  });
  return successReturn();
}
export async function uniqueName(name) {
  const result = await prisma.test.findFirst({ where: { name: name } });
  return successReturn(result);
}
