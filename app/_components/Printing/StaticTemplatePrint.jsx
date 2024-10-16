import React from "react";
import UrinalysisTemplatePrint from "./PresetTemplates/UrinalysisTemplatePrint";
import HematologyCoagulationTemplatePrint from "./PresetTemplates/HematologyCoagulationTemplatePrint";
import CultureAndSensitivityTemplatePrint from "./PresetTemplates/CultureAndSensitivityTemplatePrint";
import SerologyTemplatePrint from "./PresetTemplates/SerologyTemplatePrint";
import SemenAnalysisTemplatePrint from "./PresetTemplates/SemenAnalysisTemplatePrint";
import BloodTypeTemplatePrint from "./PresetTemplates/BloodTypeTemplatePrint";
import PTTemplatePrint from "./PresetTemplates/PTTemplatePrint";
import PTTTemplatePrint from "./PresetTemplates/PTTTemplatePrint";
import PregnancyTestTemplatePrint from "./PresetTemplates/PregnancyTestTemplatePrint";

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
          Serology: <SerologyTemplatePrint template={template} />,
          "Semen Analysis": <SemenAnalysisTemplatePrint template={template} />,
          "Blood Type": <BloodTypeTemplatePrint template={template} />,
          "Prothrombin Time (PT)": <PTTemplatePrint template={template} />,
          "Partial Thromboplastin Time (PTT)": (
            <PTTTemplatePrint template={template} />
          ),
          "Pregnancy Test": <PregnancyTestTemplatePrint template={template} />,
        }[template.staticTemplate]
      }
    </div>
  );
}

export default StaticTemplatePrint;
