"use client";
import React, { useEffect, useState } from "react";
import UrinalysisTemplateInput from "./PresetTemplates/UrinalysisTemplateInput";
import HematologyCoagulationTemplateInput from "./PresetTemplates/HematologyCoagulationTemplateInput";
import { toast } from "react-toastify";

function StaticTemplateInput({ test, updateTemplate, lastTest }) {
  const [result, setResult] = useState(test.test.template.result || {});
  const [isDirty, setIsDirty] = useState(false);

  const handleRestore = () => {
    if (test.test.template.hasOwnProperty("result")) {
      setResult(test.test.template.result);
    } else {
      setResult({});
    }
    setIsDirty(false);
  };

  const handleSave = () => {
    let shouldStop = false;
    switch (test.test.template.staticTemplate) {
      case "Hematology - Coagulation":
        if (Object.keys(result).length !== 18) {
          toast.error("يرجى تعبئة جميع حقول التحليل");
          shouldStop = true;
        }
        break;

      case "تحليل البول Urinalysis":
        if (Object.keys(result).length !== 20) {
          toast.error("يرجى تعبئة جميع حقول التحليل");
          shouldStop = true;
        }
        break;
    }
    if (shouldStop) return;
    const readyTest = test;
    readyTest.test.template.result = result;
    updateTemplate(readyTest);
    setIsDirty(false);
  };

  const handleUpdateState = (row, value, shouldBeANumber = true) => {
    if (isNaN(value) && shouldBeANumber) return;

    let tempResult = structuredClone(result);
    tempResult[row] = value;
    setResult(tempResult);
  };
  useEffect(() => {
    if (
      JSON.stringify(result) !== JSON.stringify(test.test.template.result || {})
    )
      setIsDirty(true);
  }, [result]);

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {
        {
          "تحليل البول Urinalysis": (
            <UrinalysisTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
            />
          ),
          "Hematology - Coagulation": (
            <HematologyCoagulationTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              lastTest={lastTest}
            />
          ),
        }[test.test.template.staticTemplate]
      }
    </div>
  );
}

export default StaticTemplateInput;
