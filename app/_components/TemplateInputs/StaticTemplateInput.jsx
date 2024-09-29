"use client";
import React, { useEffect, useState } from "react";
import UrinalysisTemplateInput from "./PresetTemplates/UrinalysisTemplateInput";
import HematologyCoagulationTemplateInput from "./PresetTemplates/HematologyCoagulationTemplateInput";
import { toast } from "react-toastify";
import CultureAndSensitivityTemplateInput from "./PresetTemplates/CultureAndSensitivityTemplateInput";
import api from "@/app/_lib/api";

function StaticTemplateInput({ test, updateTemplate, lastTest }) {
  const [result, setResult] = useState(test.test.template.result || {});
  const [isDirty, setIsDirty] = useState(false);

  const handleRestore = () => {
    if (test.test.template.hasOwnProperty("result")) {
      setResult(test.test.template.result);
    } else {
      if (test.test.template.staticTemplate === "Culture And Sensitivity") {
        setResult({
          selectedAA: [],
          isPositive: true,
          specimen: "",
          growthOf: "",
          coloniesCount: "",
        });
      } else {
        setResult({});
      }
    }
    setIsDirty(false);
  };

  const handleSave = async () => {
    let shouldStop = false;
    switch (test.test.template.staticTemplate) {
      case "Hematology - Coagulation":
        if (Object.keys(result).length !== 18) {
          shouldStop = true;
        }
        break;

      case "تحليل البول Urinalysis":
        if (Object.keys(result).length !== 20) {
          shouldStop = true;
        }
        break;
      case "Culture And Sensitivity":
        let shouldAppend = false;
        if (result.isPositive) {
          if (
            result.specimen === "" ||
            result.growthOf === "" ||
            result.coloniesCount === ""
          ) {
            shouldStop = true;
            break;
          } else {
            shouldAppend = true;
          }

          if (result.selectedAA.length === 0) {
            toast.error("يرجى إدخال مضاد واحد على الأقل");
            return;
          }
          // add arbitrary values to the db
          await api.put(`/arbitrary/cs/append`, {
            specimen: result.specimen,
            growthOf: result.growthOf,
          });
        }
        break;
    }
    if (shouldStop) {
      toast.error("يرجى تعبئة جميع حقول التحليل");
      return;
    }
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
      test.test.template.staticTemplate === "Culture And Sensitivity" &&
      JSON.stringify(result) === "{}"
    ) {
      setResult({
        selectedAA: [],
        isPositive: true,
        specimen: "",
        growthOf: "",
        coloniesCount: "",
      });
      setTimeout(() => {
        setIsDirty(false);
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (
      JSON.stringify(result) !== JSON.stringify(test.test.template.result || {})
    ) {
      setIsDirty(true);
    }
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
          "Culture And Sensitivity": (
            <CultureAndSensitivityTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
            />
          ),
        }[test.test.template.staticTemplate]
      }
    </div>
  );
}

export default StaticTemplateInput;
