import { successReturn } from "../_lib/controllerReturnGenerator";
import prisma from "../_lib/prisma";

export async function getVisitTest(id) {
  const result = await prisma.visitTest.findUnique({ where: { id: id } });
  return successReturn(result);
}

export async function createVisitTest(data) {
  await prisma.visitTest.createMany({
    data: data.data,
  });
  return successReturn();
}

export async function updateVisitTest(id, data) {
  await prisma.visitTest.update({
    where: {
      id: id,
    },
    data: {
      units: data.units,
      price: data.price,
      template: data.template,
    },
  });
  return successReturn();
}

export async function updateVisitTestTemplate(id, data) {
  await prisma.visitTest.update({
    where: {
      id: id,
    },
    data: {
      template: data.template,
    },
  });
  return successReturn();
}

export async function deleteVisitTest(id) {
  await prisma.visitTest.delete({ where: { id: id } });
  return successReturn();
}

export async function getLastVisitTest(testId, patientId, dateInQuestion) {
  const result = await prisma.visitTest.findFirst({
    where: {
      testId: testId,
      Visit: {
        patientId: patientId,
        date: { lt: dateInQuestion },
      },
    },
    include: { Visit: true },
    orderBy: { Visit: { date: "desc" } },
  });
  return successReturn(result);
}
