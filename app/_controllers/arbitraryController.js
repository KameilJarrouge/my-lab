import { successReturn } from "../_lib/controllerReturnGenerator";
import prisma from "../_lib/prisma";

const CultureAndSensitivityRows = [
  {
    agent: "Imipenem",
    r: 13,
    s: 16,
    commercialNames: "TIENAM (MSD), PRIMAXIN (MSD).",
    result: 0,
  },
  {
    agent: "Cefotaxime",
    r: 14,
    s: 23,
    commercialNames: "Claphoram, CLAFORAN (Roussel).",
    result: 0,
  },
  {
    agent: "Cefadroxil",
    r: 14,
    s: 18,
    commercialNames: "Duricef, CEDROX (Hikma), ULTRACEF (Bristol).",
    result: 0,
  },
  {
    agent: "Clindamycine",
    r: 14,
    s: 17,
    commercialNames: "Lindocine, Clindacine, DALACIN C (Upjohn).",
    result: 0,
  },

  {
    agent: "Kanamycin",
    r: 13,
    s: 16,
    commercialNames: "Kanamycin, KANTREX (Bristol).",
    result: 0,
  },

  {
    agent: "Pefloxacin",
    r: 12,
    s: 17,
    commercialNames: "Peflacin, Sinasin, PEFLACINE (Bellon Roger).",
    result: 0,
  },

  {
    agent: "Doxycycline",
    r: 12,
    s: 16,
    commercialNames: "Unicycline, Doxymas, VIBRAMYCIN (Pfizer).",
    result: 0,
  },

  {
    agent: "Ofloxacin",
    r: 12,
    s: 16,
    commercialNames: "Oflocet, FLOXIN (Ortho McNeil).",
    result: 0,
  },

  {
    agent: "Ciprofloxacin",
    r: 15,
    s: 21,
    commercialNames: "Ciproflex, Sipro, CIPROBAY (Bayer).",
    result: 0,
  },

  {
    agent: "Cefpodoxime",
    r: 17,
    s: 21,
    commercialNames: "Oraluxe, VANTIN (Upjohn).",
    result: 0,
  },

  {
    agent: "Cephradin",
    r: 14,
    s: 18,
    commercialNames: "Velosef, Cephradex, CEFRASOL (Radium farma).",
    result: 0,
  },

  {
    agent: "Amikacin",
    r: 14,
    s: 17,
    commercialNames: "Amikacin, Minocin, AMIKIN (Bristol).",
    result: 0,
  },

  {
    agent: "Ceftriaxone",
    r: 13,
    s: 21,
    commercialNames: "Rociflex, ROCEPHIN (Roche).",
    result: 0,
  },

  {
    agent: "Amoxi. & Clavulanic Acid",
    r: 13,
    s: 20,
    commercialNames: "Ogmentine, AUGMENTINE (Beecham).",
    result: 0,
  },
];

const Urinalysis = {
  Color: [],
  Appearance: [],
  "Specific Gravity": [],
  pH: [],
  Glucose: [],
  Protein: [],
  Hemoglobin: [],
  Urobilinogen: [],
  Bilirubin: [],
  Nitrite: [],
  Ketone: [],
  Leucocytes: [],
  Erythrocytes: [],
  "Epithelial Cells": [],
  Cylinders: [],
  "Ca. Oxalate": [],
  Urate: [],
  "Uric Acid": [],
  Phosphate: [],
  Dynamic: [],
};

async function createArbitrary() {
  const result = await prisma.arbitrary.create({
    data: {
      CS_ANTIMICROBIAL_AGENTS: JSON.stringify(CultureAndSensitivityRows),
      CS_Growth_Of: "[]",
      CS_Specimen: "[]",
      Urinalysis: JSON.stringify(Urinalysis),
      // Fill this with remaining fields once you add them
    },
  });
  return result;
}

export async function getCSArbitrary() {
  let result = await prisma.arbitrary.findFirst({
    select: {
      id: true,
      CS_Growth_Of: true,
      CS_Specimen: true,
    },
  });
  if (!result) return successReturn(await createArbitrary());

  return successReturn(result);
}

export async function getCSAntimicrobialAgents() {
  let result = await prisma.arbitrary.findFirst({
    select: {
      id: true,
      CS_ANTIMICROBIAL_AGENTS: true,
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
    data: {
      CS_ANTIMICROBIAL_AGENTS:
        antimicrobialAgents !== undefined
          ? JSON.stringify(antimicrobialAgents)
          : undefined,
      CS_Growth_Of:
        growthOf !== undefined ? JSON.stringify(growthOf) : undefined,
      CS_Specimen:
        specimen !== undefined ? JSON.stringify(specimen) : undefined,
    },
  });
  return successReturn();
}

export async function appendCSArbitrary(specimen, growthOf) {
  let result = await getCSArbitrary();
  let specimens = JSON.parse(result.returned.CS_Specimen);
  let growthOfs = JSON.parse(result.returned.CS_Growth_Of);
  if (!specimens.includes(specimen)) {
    specimens.push(specimen);
  } else {
    specimens = undefined;
  }
  if (!growthOfs.includes(growthOf)) {
    growthOfs.push(growthOf);
  } else {
    growthOfs = undefined;
  }

  return await updateCSArbitrary(
    result.returned.id,
    undefined,
    growthOfs,
    specimens
  );
}

export async function getUrinalysisArbitrary() {
  let result = await prisma.arbitrary.findFirst({
    select: {
      id: true,
      Urinalysis: true,
    },
  });
  if (!result) return successReturn(await createArbitrary());

  return successReturn(result);
}

export async function updateUrinalysisArbitrary(id, urinalysis) {
  await prisma.arbitrary.update({
    where: {
      id: id,
    },
    data: {
      Urinalysis: JSON.stringify(urinalysis),
    },
  });
  return successReturn();
}

export async function appendUrinalysisArbitrary(urinalysis) {
  let result = await getUrinalysisArbitrary();
  let urinalysisInDB = JSON.parse(result.returned.Urinalysis);
  let keys = Object.keys(urinalysisInDB);
  let field = undefined;
  for (let i = 0; i < keys.length; i++) {
    field = keys[i];

    if (field === "Dynamic") {
      if (!urinalysis.hasOwnProperty("Dynamic")) continue;
      for (let item of urinalysis[field]) {
        if (item.name !== "" && !urinalysisInDB[field].includes(item.name)) {
          urinalysisInDB[field].push(item.name);
        }
      }
    } else if (
      urinalysis[field] !== "" &&
      !urinalysisInDB[field].includes(urinalysis[field])
    ) {
      urinalysisInDB[field].push(urinalysis[field]);
    }
  }

  return await updateUrinalysisArbitrary(result.returned.id, urinalysisInDB);
}
