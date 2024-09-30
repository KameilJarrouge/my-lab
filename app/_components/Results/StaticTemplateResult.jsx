"use client";
import React from "react";
import UrinalysisTemplateResult from "./PresetTemplates/UrinalysisTemplateResult";
import HematologyCoagulationTemplateResult from "./PresetTemplates/HematologyCoagulationTemplateResult";
import CultureAndSensitivityTemplateResult from "./PresetTemplates/CultureAndSensitivityTemplateResult";

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
        }[template.staticTemplate]
      }
    </div>
  );
}

export default StaticTemplateResult;
