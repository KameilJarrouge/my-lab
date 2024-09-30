import React from "react";
import UrinalysisTemplatePrint from "./PresetTemplates/UrinalysisTemplatePrint";
import HematologyCoagulationTemplatePrint from "./PresetTemplates/HematologyCoagulationTemplatePrint";
import CultureAndSensitivityTemplatePrint from "./PresetTemplates/CultureAndSensitivityTemplatePrint";

function StaticTemplatePrint({ id, template, lastTestResult, lastTestDate }) {
  return (
    <div
      className="flex flex-col gap-6 w-full items-center pt-[2mm]"
      id={"static-template-print-" + id}
    >
      {
        {
          "تحليل البول Urinalysis": (
            <UrinalysisTemplatePrint template={template} />
          ),
          "Hematology - Coagulation": (
            <HematologyCoagulationTemplatePrint
              template={template}
              lastTestDate={lastTestDate}
              lastTestResult={lastTestResult}
            />
          ),
          "Culture And Sensitivity": (
            <CultureAndSensitivityTemplatePrint
              template={template}
              catIndex={id}
            />
          ),
        }[template.staticTemplate]
      }
    </div>
  );
}

export default StaticTemplatePrint;
