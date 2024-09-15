import { successReturn } from "../_lib/controllerReturnGenerator";
import prisma from "../_lib/prisma";

async function createSettings() {
  return await prisma.settings.create({
    data: {
      unitPrice: 1.0,
      units: "[]",
      location:
        "مصياف - شارع الوراقة - مقابل صيدلية منال الناعمة - هاتف 7719944",
    },
  });
}

export async function getSettings() {
  let settings = await prisma.settings.findFirst();
  if (settings === null) {
    return successReturn(await createSettings());
  } else {
    return successReturn(settings);
  }
}

export async function addUnitOrNothing(name) {
  const measureUnits = await prisma.settings.findFirst({
    select: { units: true, id: true },
  });
  const parsedMeasureUnites = JSON.parse(measureUnits.units);
  const result = parsedMeasureUnites.filter(
    (unit) => unit.toLowerCase() === name.toLowerCase()
  );
  if (result.length === 0) {
    // add new measure units
    parsedMeasureUnites.push(name);
    await prisma.settings.update({
      where: {
        id: measureUnits.id,
      },
      data: { units: JSON.stringify(parsedMeasureUnites) },
    });
  }
  return successReturn();
}

export async function setUnitPrice(id, data) {
  await prisma.settings.update({
    where: { id: id },
    data: { unitPrice: data.unitPrice },
  });
  return successReturn();
}
export async function setUnits(id, data) {
  await prisma.settings.update({
    where: { id: id },
    data: { units: JSON.stringify(data.units) },
  });
  return successReturn();
}
export async function setLocation(id, data) {
  await prisma.settings.update({
    where: { id: id },
    data: { location: data.location },
  });
  return successReturn();
}
