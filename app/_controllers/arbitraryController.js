import { successReturn } from "../_lib/controllerReturnGenerator";
import prisma from "../_lib/prisma";

async function createArbitrary() {
  const result = await prisma.arbitrary.create({
    data: {
      CS_ANTIMICROBIAL_AGENTS: "[]",
      CS_Growth_Of: "[]",
      CS_Specimen: "[]",
      // Fill this with remaining fields once you add them
    },
  });
  return result;
}

export async function getCSArbitrary() {
  let result = await prisma.arbitrary.findFirst({
    select: {
      id: true,
      CS_ANTIMICROBIAL_AGENTS: true,
      CS_Growth_Of: true,
      CS_Specimen: true,
    },
  });
  if (!result) return successReturn(await createArbitrary());

  return successReturn(result);
}

export async function updateCSArbitrary(
  id,
  antimicrobialAgents,
  growthOf,
  specimen
) {
  await prisma.arbitrary.update({
    where: {
      id: id,
    },
    CS_ANTIMICROBIAL_AGENTS: antimicrobialAgents
      ? JSON.stringify(antimicrobialAgents)
      : undefined,
    CS_Growth_Of: growthOf ? JSON.stringify(growthOf) : undefined,
    CS_Specimen: specimen ? JSON.stringify(specimen) : undefined,
  });
  return successReturn();
}
