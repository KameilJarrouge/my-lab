import { successReturn } from "../_lib/controllerReturnGenerator";
import prisma from "../_lib/prisma";

export async function getPatient(id) {
  const result = await prisma.patient.findUnique({
    where: {
      id: id,
    },
  });
  return successReturn(result);
}

export async function getCompletePatient(id) {
  const result = await prisma.patient.findUnique({
    where: { id: id },
    include: {
      visits: {
        include: {
          doctor: true,
          tests: { include: { Test: { include: { category: true } } } },
        },
      },
    },
  });

  return successReturn(result);
}

export async function createPatient(data) {
  const result = await prisma.patient.create({
    data: {
      name: data.name,
      age: data.age,
      notes: data.notes,
      sex: data.sex,
    },
  });
  return successReturn(result.id);
}

export async function updatePatient(id, data) {
  await prisma.patient.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      age: data.age,
      notes: data.notes,
      sex: data.sex,
    },
  });
  return successReturn();
}

export async function deletePatient(id) {
  await prisma.patient.delete({ where: { id: id } });
  return successReturn();
}

export async function uniqueName(name) {
  const result = await prisma.patient.findFirst({ where: { name: name } });
  return successReturn(result);
}

export async function searchPatients(key) {
  let conditions = {};
  if (!isNaN(Number(key))) conditions["id"] = Number(key);

  const result = await prisma.patient.findMany({
    where: { OR: [{ name: { contains: key } }, { ...conditions }] },
    take: 20,
    orderBy: { createdAt: "desc" },
  });

  return successReturn(result);
}

export async function allPatients(name, sex, ageOperand, age, page) {
  let conditions = {};

  if (name !== "") conditions["name"] = { contains: name };

  if (sex !== "الجميع") conditions["sex"] = sex;

  if (ageOperand !== "الجميع") {
    switch (ageOperand) {
      case "أكبر من":
        conditions["age"] = { gte: Number(age) };
        break;
      case "يساوي":
        conditions["age"] = { equals: Number(age) };
        break;
      case "أصغر من":
        conditions["age"] = { lte: Number(age) };
        break;
    }
  }

  const count = await prisma.patient.count({
    where: { ...conditions },
  });

  const result = await prisma.patient.findMany({
    where: { ...conditions },
    take: 20,
    skip: (Number(page) - 1) * 20,
    orderBy: { createdAt: "desc" },
  });

  return successReturn({ patients: result, count: count });
}
