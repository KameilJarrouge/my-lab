import moment from "moment";
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

export async function updateVisitTestNote(id, data) {
  await prisma.visitTest.update({
    where: {
      id: id,
    },
    data: {
      note: data.note,
    },
  });
  return successReturn();
}

export async function deleteVisitTest(id) {
  await prisma.visitTest.delete({ where: { id: id } });
  return successReturn();
}

export async function getLastVisitTest(
  testId,
  patientId,
  dateInQuestion,
  visitId
) {
  const result = await prisma.visitTest.findFirst({
    where: {
      testId: testId,
      Visit: {
        id: { not: visitId },

        patientId: patientId,
        date: { lt: dateInQuestion },
      },
    },
    include: { Visit: true },
    orderBy: { Visit: { date: "desc" } },
  });
  return successReturn(result);
}

export async function getMultipleLastVisitTest(data) {
  const result = await prisma.$transaction(
    data.map((params) =>
      prisma.visitTest.findFirst({
        where: {
          testId: params.testId,
          Visit: {
            id: { not: data.visitId },
            patientId: params.patientId,
            date: { lt: new Date(params.dateInQuestion) },
          },
        },
        include: { Visit: true },
        orderBy: { Visit: { date: "desc" } },
      })
    )
  );

  let returned = {};
  for (let i = 0; i < result.length; i++) {
    let element = result[i];
    if (element) {
      element.template = JSON.parse(element.template);
    }
    returned[data[i].visitTestId] = element;
  }
  return successReturn(returned);
}

export async function getTodaysEarnings() {
  const result = await prisma.visitTest.findMany({
    where: {
      Visit: {
        date: {
          lte: moment(new Date()).endOf("day").toDate(),
          gte: moment(new Date()).startOf("day").toDate(),
        },
      },
    },
  });

  const totalEarnings = result.reduce((acc, record) => {
    return acc + record.units * record.price;
  }, 0);

  return successReturn(totalEarnings);
}

export async function updateVisibility(id, visible) {
  await prisma.visitTest.update({
    where: { id: id },
    data: { visible: visible },
  });
  return successReturn();
}
