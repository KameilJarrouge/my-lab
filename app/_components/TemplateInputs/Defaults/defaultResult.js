const SemenAnalysis = {
  PH: "8",
  Viscosity: "normal",
  Volume: "",
  Color: "milky",
  "Abnormal Forms": "",
  "Normal Forms": "",
  "Sperm Count": "",
  "Spermatogenic Cells": "",
  Erythrocytes: "",
  Leucocytes: "",
  "Direct Motility Very Active": "",
  "Direct Motility Active": "",
  "Direct Motility Inactive": "",
  "Motility After 1 hr Very Active": "",
  "Motility After 1 hr Active": "",
  "Motility After 1 hr Inactive": "",
  "Motility After 2 hr Very Active": "",
  "Motility After 2 hr Active": "",
  "Motility After 2 hr Inactive": "",
};

const Urinalysis = {
  Color: "",
  Appearance: "",
  "Specific Gravity": "",
  pH: "",
  Glucose: "Neg.",
  Protein: "Neg.",
  Hemoglobin: "Neg.",
  Urobilinogen: "Neg.",
  Bilirubin: "Neg.",
  Nitrite: "Neg.",
  Ketone: "Neg.",
  Leucocytes: "1-2",
  Erythrocytes: "1-2",
  "Epithelial Cells": "1-2",
  Cylinders: "0",
  "Ca. Oxalate": "-",
  Urate: "-",
  "Uric Acid": "-",
  Phosphate: "-",
  Dynamic: [],
};

const HematologyCoagulation = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: "",
  15: "",
  16: "",
  17: "",
};

const CultureAndSensitivity = {
  selectedAA: [],
  isPositive: true,
  specimen: "",
  growthOf: "",
  coloniesCount: "",
};

const Serology = {
  "B. Abortus": "Neg.",
  "B. Melitensis": "Neg.",
  "Typhi. ( O )": "Neg.",
  "Typhi. ( H )": "Neg.",
  "Para A ( H )": "Neg.",
  "Para B ( H )": "Neg.",
  selectedTest: "Both",
};

const BloodType = {
  bloodGroup: "A",
  Rh: "Negative",
};

const PT = {
  pt1: "",
  pt2: "",
  control1: "",
  control2: "",
  INR: "",
};

const PTT = {
  ptt: "",
  control: "",
};

const PregnancyTest = {
  pregnancyResult: "Negative",
};

export default function getDefaultResult(staticTemplate) {
  switch (staticTemplate) {
    case "تحليل البول Urinalysis":
      return Urinalysis;
    case "Hematology - Coagulation":
      return HematologyCoagulation;
    case "Culture And Sensitivity":
      return CultureAndSensitivity;
    case "Serology":
      return Serology;
    case "Semen Analysis":
      return SemenAnalysis;
    case "Blood Type":
      return BloodType;
    case "Prothrombin Time (PT)":
      return PT;
    case "Partial Thromboplastin Time (PTT)":
      return PTT;
    case "Pregnancy Test":
      return PregnancyTest;
  }
}
