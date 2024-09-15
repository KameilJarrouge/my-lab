import { successReturn } from "../_lib/controllerReturnGenerator";
import prisma from "../_lib/prisma";

export async function getDoctor(id) {
  const result = await prisma.doctor.findUnique({ where: { id: id } });
  return successReturn(result);
}

export async function allDoctors(name, page) {
  const count = await prisma.doctor.count({
    where: { name: { contains: name } },
  });
  const result = await prisma.doctor.findMany({
    where: { name: { contains: name } },
    take: 20,
    skip: (Number(page) - 1) * 20,
  });
  return successReturn({ doctors: result, count: count });
}

export async function listDoctors() {
  const result = await prisma.doctor.findMany();

  return successReturn(result);
}

export async function createDoctor(data) {
  const result = await prisma.doctor.create({
    data: {
      name: data.name,
    },
  });
  return successReturn(result);
}

export async function updateDoctor(id, data) {
  await prisma.doctor.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
    },
  });
  return successReturn();
}

export async function deleteDoctor(id) {
  await prisma.doctor.delete({ where: { id: id } });
  return successReturn();
}

export async function uniqueName(name) {
  const result = await prisma.doctor.findFirst({ where: { name: name } });
  return successReturn(result);
}
