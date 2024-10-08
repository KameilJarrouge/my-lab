const SemenAnalysis = {
  PH: "",
  Viscosity: "",
  Volume: "",
  Color: "",
  "Abnormal Forms": "",
  "Normal Forms": "",
  "Sperm Count": "",
  "Spermatogenic Cells": "",
  Erythrocytes: "",
  Leucocytes: "",
  "Directl Motility Very Active": "",
  "Directl Motility Active": "",
  "Directl Motility Inactive": "",
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
  Glucose: "",
  Protein: "",
  Hemoglobin: "",
  Urobilinogen: "",
  Bilirubin: "",
  Nitrite: "",
  Ketone: "",
  Leucocytes: "",
  Erythrocytes: "",
  "Epithelial Cells": "",
  Cylinders: "",
  "Ca. Oxalate": "",
  Urate: "",
  "Uric Acid": "",
  Phosphate: "",
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
  "B. Abortus": "",
  "B. Melitensis": "",
  "Typhi. ( O )": "",
  "Typhi. ( H )": "",
  "Para A ( H )": "",
  "Para B ( H )": "",
  selectedTest: "Both",
};

const BloodType = {
  bloodGroup: "A",
  Rh: "Negative",
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
  }
}
