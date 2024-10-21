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

const Serology = {
  "B. Abortus": [],
  "B. Melitensis": [],
  "Typhi. ( O )": [],
  "Typhi. ( H )": [],
  "Para A ( H )": [],
  "Para B ( H )": [],
};

const SemenAnalysis = {
  PH: [],
  Viscosity: [],
  Volume: [],
  Color: [],
  "Abnormal Forms": [],
  "Normal Forms": [],
  "Sperm Count": [],
  "Spermatogenic Cells": [],
  Erythrocytes: [],
  Leucocytes: [],
  "Direct Motility Very Active": [],
  "Direct Motility Active": [],
  "Direct Motility Inactive": [],
  "Motility After 1 hr Inactive": [],
  "Motility After 1 hr Very Active": [],
  "Motility After 1 hr Active": [],
  "Motility After 1 hr Inactive": [],
  "Motility After 2 hr Very Active": [],
  "Motility After 2 hr Active": [],
  "Motility After 2 hr Inactive": [],
};

const StoolExamination = {
  Color: [],
  Consistency: [],
  // Ova: [],
  // Cysts: [],
  // Trophozoites: [],
  "Ascaris Lumbricoides": [],
  "Entamoeba Histolytica C": [],
  "Entamoeba Histolytica T": [],
  Trichocephalus: [],
  "Giardia Lamblia C": [],
  "Giardia Lamblia T": [],
  "Hymenolepis Nana": [],
  "Entamoeba Coli C": [],
  "Entamoeba Coli T": [],
  Taenia: [],
  Leucocytes: [],
  "Starch Granules": [],
  Mucus: [],
  Erythrocytes: [],
  "Fat Globules": [],
  Fungi: [],
  "Meat fibers": [],
};

function shouldBeSaved(text) {
  return text.trim() !== "";
}

export async function getAllArbitrary() {
  const result = await prisma.arbitrary.findFirst({});
  if (!result) return successReturn(await createArbitrary());

  return successReturn(await assertFieldsNotNull(result));
}

export async function updateArbitrary(data) {
  await prisma.arbitrary.update({
    data: {
      CS_Growth_Of: JSON.stringify(
        data["Culture And Sensitivity"]["Growth Of"]
      ),
      CS_Specimen: JSON.stringify(data["Culture And Sensitivity"]["Specimen"]),
      Urinalysis: JSON.stringify(data.Urinalysis),
      Serology: JSON.stringify(data.Serology),
      SemenAnalysis: JSON.stringify(data.SemenAnalysis),
      StoolExamination: JSON.stringify(data.StoolExamination),
    },
    where: {
      id: data.id,
    },
  });
  return successReturn();
}

function getTemplate(key) {
  switch (key) {
    case "CS_ANTIMICROBIAL_AGENTS":
      return JSON.stringify(CultureAndSensitivityRows);
    case "CS_Growth_Of":
      return "[]";
    case "CS_Specimen":
      return "[]";
    case "Urinalysis":
      return JSON.stringify(Urinalysis);
    case "Serology":
      return JSON.stringify(Serology);
    case "SemenAnalysis":
      return JSON.stringify(SemenAnalysis);
    case "StoolExamination":
      return JSON.stringify(StoolExamination);

    default:
      return "[]";
  }
}

async function createArbitrary() {
  const result = await prisma.arbitrary.create({
    data: {
      CS_ANTIMICROBIAL_AGENTS: getTemplate("CS_ANTIMICROBIAL_AGENTS"),
      CS_Growth_Of: getTemplate("CS_Growth_Of"),
      CS_Specimen: getTemplate("CS_Specimen"),
      Urinalysis: getTemplate("Urinalysis"),
      Serology: getTemplate("Serology"),
      SemenAnalysis: getTemplate("SemenAnalysis"),
      StoolExamination: getTemplate("StoolExamination"),
      // Fill this with remaining fields once you add them
    },
  });
  return result;
}

/**
 * asserts that the result from arbitrary doesn't contain null fields, and creates them if null.
 * @param {object} object object to question if it's fields are null
 * @returns {object} same object if no fields are null, or a new object with filled fields
 */
async function assertFieldsNotNull(object) {
  let nullKeys = Object.keys(object).filter((key) => !object[key]);

  if (nullKeys.length === 0) return object;

  let data = {};
  for (const nullKey of nullKeys) {
    data[nullKey] = getTemplate(nullKey);
  }

  const result = await prisma.arbitrary.update({
    where: { id: object.id },
    data: data,
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

  return successReturn(await assertFieldsNotNull(result));
}

export async function getCSAntimicrobialAgents() {
  let result = await prisma.arbitrary.findFirst({
    select: {
      id: true,
      CS_ANTIMICROBIAL_AGENTS: true,
    },
  });
  if (!result) return successReturn(await createArbitrary());

  return successReturn(await assertFieldsNotNull(result));
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
  if (shouldBeSaved(specimen) && !specimens.includes(specimen)) {
    specimens.push(specimen);
  } else {
    specimens = undefined;
  }
  if (shouldBeSaved(growthOf) && !growthOfs.includes(growthOf)) {
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

  return successReturn(await assertFieldsNotNull(result));
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
        if (
          shouldBeSaved(item.name) &&
          !urinalysisInDB[field].includes(item.name)
        ) {
          urinalysisInDB[field].push(item.name);
        }
      }
    } else if (
      shouldBeSaved(urinalysis[field]) &&
      !urinalysisInDB[field].includes(urinalysis[field])
    ) {
      urinalysisInDB[field].push(urinalysis[field]);
    }
  }

  return await updateUrinalysisArbitrary(result.returned.id, urinalysisInDB);
}

export async function getStoolExamination() {
  let result = await prisma.arbitrary.findFirst({
    select: {
      id: true,
      StoolExamination: true,
    },
  });
  if (!result) return successReturn(await createArbitrary());

  return successReturn(await assertFieldsNotNull(result));
}

export async function updateStoolExaminationArbitrary(id, stoolExamination) {
  await prisma.arbitrary.update({
    where: {
      id: id,
    },
    data: {
      StoolExamination: JSON.stringify(stoolExamination),
    },
  });
  return successReturn();
}

export async function appendStoolExaminationArbitrary(stoolExamination) {
  let result = await getStoolExamination();
  let stoolInDB = JSON.parse(result.returned.StoolExamination);
  let keys = Object.keys(stoolInDB);
  let field = undefined;
  for (let i = 0; i < keys.length; i++) {
    field = keys[i];

    if (
      shouldBeSaved(stoolExamination[field]) &&
      !stoolInDB[field].includes(stoolExamination[field])
    ) {
      stoolInDB[field].push(stoolExamination[field]);
    }
  }

  return await updateStoolExaminationArbitrary(result.returned.id, stoolInDB);
}

export async function getSerologyArbitrary() {
  let result = await prisma.arbitrary.findFirst({
    select: {
      id: true,
      Serology: true,
    },
  });
  if (!result) return successReturn(await createArbitrary());

  return successReturn(await assertFieldsNotNull(result));
}

export async function updateSerologyArbitrary(id, serology) {
  await prisma.arbitrary.update({
    where: {
      id: id,
    },
    data: {
      Serology: JSON.stringify(serology),
    },
  });
  return successReturn();
}

export async function appendSerologyArbitrary(serology) {
  let result = await getSerologyArbitrary();
  let serologyInDB = JSON.parse(result.returned.Serology);
  let keys = Object.keys(serology);
  let field = undefined;
  for (let i = 0; i < keys.length; i++) {
    field = keys[i];
    if (field === "selectedTest") continue;
    if (
      shouldBeSaved(serology[field]) &&
      !serologyInDB[field].includes(serology[field])
    ) {
      serologyInDB[field].push(serology[field]);
    }
  }

  return await updateSerologyArbitrary(result.returned.id, serologyInDB);
}

export async function getSemenAnalysisArbitrary() {
  let result = await prisma.arbitrary.findFirst({
    select: {
      id: true,
      SemenAnalysis: true,
    },
  });
  if (!result) return successReturn(await createArbitrary());

  return successReturn(await assertFieldsNotNull(result));
}

export async function updateSemenAnalysisArbitrary(id, semenAnalysis) {
  await prisma.arbitrary.update({
    where: {
      id: id,
    },
    data: {
      SemenAnalysis: JSON.stringify(semenAnalysis),
    },
  });
  return successReturn();
}

export async function appendSemenAnalysisArbitrary(semenAnalysis) {
  let result = await getSemenAnalysisArbitrary();
  let semenAnalysisInDB = JSON.parse(result.returned.SemenAnalysis);
  let keys = Object.keys(semenAnalysis);
  let field = undefined;
  for (let i = 0; i < keys.length; i++) {
    field = keys[i];
    if (!semenAnalysisInDB[field]) {
    }
    if (
      shouldBeSaved(semenAnalysis[field]) &&
      !semenAnalysisInDB[field].includes(semenAnalysis[field])
    ) {
      semenAnalysisInDB[field].push(semenAnalysis[field]);
    }
  }

  return await updateSemenAnalysisArbitrary(
    result.returned.id,
    semenAnalysisInDB
  );
}
