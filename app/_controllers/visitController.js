import moment from "moment";
import { successReturn } from "../_lib/controllerReturnGenerator";
import prisma from "../_lib/prisma";

export async function getVisit(id) {
  const result = await prisma.visit.findUnique({
    where: {
      id: id,
    },
    include: {
      doctor: true,
      Patient: true,
      tests: {
        include: {
          Test: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });
  return successReturn(result);
}

export async function getVisits(
  patientId,
  isByTest,
  byId,
  doctorId,
  startDate,
  endDate,
  orderByDateDirection,
  page
) {
  let conditions = {};
  if (Number(byId) !== -1) {
    if (!isByTest) {
      conditions["tests"] = {
        some: {
          Test: { testCategoryId: Number(byId) },
        },
      };
    } else {
      conditions["tests"] = {
        some: {
          testId: Number(byId),
        },
      };
    }
  }

  if (Number(doctorId) !== -1) {
    conditions["doctorId"] = Number(doctorId);
  }

  if (startDate) {
    if (endDate) {
      const startOfStartDate = moment(startDate).startOf("day");
      const endOfEndDate = moment(endDate).endOf("day");
      conditions["date"] = {
        lte: new Date(endOfEndDate),
        gte: new Date(startOfStartDate),
      };
    } else {
      const startOfStartDate = moment(startDate).startOf("day");
      const endOfStartDate = moment(startDate).endOf("day");
      conditions["date"] = {
        lte: new Date(endOfStartDate),
        gte: new Date(startOfStartDate),
      };
    }
  }

  const count = await prisma.visit.count({
    where: { ...conditions, patientId: Number(patientId) },
  });

  const result = await prisma.visit.findMany({
    where: {
      ...conditions,
      patientId: Number(patientId),
    },
    take: 10,
    skip: (Number(page) - 1) * 10,
    orderBy: { date: orderByDateDirection },
    include: {
      doctor: true,
      tests: { include: { Test: { include: { category: true } } } },
    },
  });
  return successReturn({ visits: result, count: count });
}

export async function createVisit(data) {
  const result = await prisma.visit.create({
    data: {
      date: data.date,
      doctorId: data.doctorId,
      patientId: data.patientId,
    },
  });

  return successReturn(result);
}

export async function updateVisit(id, data) {
  await prisma.visit.update({
    where: { id: id },
    data: {
      date: data.date,
      doctorId: data.doctorId,
    },
  });
  return successReturn();
}

export async function deleteVisit(id) {
  await prisma.visit.delete({ where: { id: id } });
  return successReturn();
}
