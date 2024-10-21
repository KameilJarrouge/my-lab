"use client";
import React from "react";
import UrinalysisTemplateResult from "./PresetTemplates/UrinalysisTemplateResult";
import HematologyCoagulationTemplateResult from "./PresetTemplates/HematologyCoagulationTemplateResult";
import CultureAndSensitivityTemplateResult from "./PresetTemplates/CultureAndSensitivityTemplateResult";
import SerologyTemplateResult from "./PresetTemplates/SerologyTemplateResult";
import SemenAnalysisTemplateResult from "./PresetTemplates/SemenAnalysisTemplateResult";
import BloodTypeTemplateResult from "./PresetTemplates/BloodTypeTemplateResult";
import PTTemplateResult from "./PresetTemplates/PTTemplateResult";
import PTTTemplateResult from "./PresetTemplates/PTTTemplateResult";
import PregnancyTestTemplateResult from "./PresetTemplates/PregnancyTestTemplateResult";
import ESRTemplateResult from "./PresetTemplates/ESRTemplateResult";
import BilirubinTemplateResult from "./PresetTemplates/BilirubinTemplateResult";
import ProteinTemplateResult from "./PresetTemplates/ProteinTemplateResult";
import StoolExaminationTemplateResult from "./PresetTemplates/StoolExaminationTemplateResult";

function StaticTemplateResult({ template }) {
  return (
    <div className="w-fit flex flex-col gap-4 relative">
      {
        {
          "تحليل البول Urinalysis": (
            <UrinalysisTemplateResult template={template} />
          ),
          "Hematology - Coagulation": (
            <HematologyCoagulationTemplateResult template={template} />
          ),
          "Culture And Sensitivity": (
            <CultureAndSensitivityTemplateResult template={template} />
          ),
          Serology: <SerologyTemplateResult template={template} />,
          "Semen Analysis": <SemenAnalysisTemplateResult template={template} />,
          "Blood Type": <BloodTypeTemplateResult template={template} />,
          "Prothrombin Time (PT)": <PTTemplateResult template={template} />,
          "Partial Thromboplastin Time (PTT)": (
            <PTTTemplateResult template={template} />
          ),
          "Pregnancy Test": <PregnancyTestTemplateResult template={template} />,
          ESR: <ESRTemplateResult template={template} />,
          Bilirubin: <BilirubinTemplateResult template={template} />,
          Protein: <ProteinTemplateResult template={template} />,
          "Stool Examination": (
            <StoolExaminationTemplateResult template={template} />
          ),
        }[template.staticTemplate]
      }
    </div>
  );
}

export default StaticTemplateResult;
