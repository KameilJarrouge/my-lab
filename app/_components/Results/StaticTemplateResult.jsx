"use client";
import React from "react";
import UrinalysisTemplateResult from "./PresetTemplates/UrinalysisTemplateResult";
import HematologyCoagulationTemplateResult from "./PresetTemplates/HematologyCoagulationTemplateResult";
import CultureAndSensitivityTemplateResult from "./PresetTemplates/CultureAndSensitivityTemplateResult";
import SerologyTemplateResult from "./PresetTemplates/SerologyTemplateResult";
import SemenAnalysisTemplateResult from "./PresetTemplates/SemenAnalysisTemplateResult";
import BloodTypeTemplateResult from "./PresetTemplates/BloodTypeTemplateResult";

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
        }[template.staticTemplate]
      }
    </div>
  );
}

export default StaticTemplateResult;
