import { successReturn } from "../_lib/controllerReturnGenerator";
import prisma from "../_lib/prisma";

const CultureAndSensitivityRows = [
  {
    agent: "Imipenem",
    r: 13,
    s: 16,
    commercialNames: "TIENAM (MSD), PRIMAXIN (MSD).",
  },
  {
    agent: "Cefotaxime",
    r: 14,
    s: 23,
    commercialNames: "Claphoram, CLAFORAN (Roussel).",
  },
  {
    agent: "Cefadroxil",
    r: 14,
    s: 18,
    commercialNames: "Duricef, CEDROX (Hikma), ULTRACEF (Bristol).",
  },
  {
    agent: "Clindamycine",
    r: 14,
    s: 17,
    commercialNames: "Lindocine, Clindacine, DALACIN C (Upjohn).",
  },

  {
    agent: "Kanamycin",
    r: 13,
    s: 16,
    commercialNames: "Kanamycin, KANTREX (Bristol).",
  },

  {
    agent: "Pefloxacin",
    r: 12,
    s: 17,
    commercialNames: "Peflacin, Sinasin, PEFLACINE (Bellon Roger).",
  },

  {
    agent: "Doxycycline",
    r: 12,
    s: 16,
    commercialNames: "Unicycline, Doxymas, VIBRAMYCIN (Pfizer).",
  },

  {
    agent: "Ofloxacin",
    r: 12,
    s: 16,
    commercialNames: "Oflocet, FLOXIN (Ortho McNeil).",
  },

  {
    agent: "Ciprofloxacin",
    r: 15,
    s: 21,
    commercialNames: "Ciproflex, Sipro, CIPROBAY (Bayer).",
  },

  {
    agent: "Cefpodoxime",
    r: 17,
    s: 21,
    commercialNames: "Oraluxe, VANTIN (Upjohn).",
  },

  {
    agent: "Cephradin",
    r: 14,
    s: 18,
    commercialNames: "Velosef, Cephradex, CEFRASOL (Radium farma).",
  },

  {
    agent: "Amikacin",
    r: 14,
    s: 17,
    commercialNames: "Amikacin, Minocin, AMIKIN (Bristol).",
  },

  {
    agent: "Ceftriaxone",
    r: 13,
    s: 21,
    commercialNames: "Rociflex, ROCEPHIN (Roche).",
  },

  {
    agent: "Amoxi. & Clavulanic Acid",
    r: 13,
    s: 20,
    commercialNames: "Ogmentine, AUGMENTINE (Beecham).",
  },
];

async function createArbitrary() {
  const result = await prisma.arbitrary.create({
    data: {
      CS_ANTIMICROBIAL_AGENTS: JSON.stringify(CultureAndSensitivityRows),
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
