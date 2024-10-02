"use client";
import React, { useEffect, useState } from "react";
import UrinalysisTemplateInput from "./PresetTemplates/UrinalysisTemplateInput";
import HematologyCoagulationTemplateInput from "./PresetTemplates/HematologyCoagulationTemplateInput";
import { toast } from "react-toastify";
import CultureAndSensitivityTemplateInput from "./PresetTemplates/CultureAndSensitivityTemplateInput";
import api from "@/app/_lib/api";
import SerologyTemplateInput from "./PresetTemplates/SerologyTemplateInput";

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
    let resultMutable = structuredClone(result);
    switch (test.test.template.staticTemplate) {
      case "Hematology - Coagulation":
        if (Object.keys(resultMutable).length !== 18) {
          shouldStop = true;
        }
        break;

      case "تحليل البول Urinalysis":
        let fieldsCount = resultMutable.hasOwnProperty("Dynamic") ? 20 : 19;
        if (Object.keys(resultMutable).length !== fieldsCount) {
          shouldStop = true;
        } else {
          await api.put(`/arbitrary/urinalysis/append`, {
            urinalysis: resultMutable,
          });
        }
        break;
      case "Culture And Sensitivity":
        if (resultMutable.isPositive) {
          if (
            resultMutable.specimen === "" ||
            resultMutable.growthOf === "" ||
            resultMutable.coloniesCount === ""
          ) {
            shouldStop = true;
            break;
          }

          if (resultMutable.selectedAA.length === 0) {
            toast.error("يرجى إدخال مضاد واحد على الأقل");
            return;
          }
          if (!shouldStop) {
            // add arbitrary values to the db
            await api.put(`/arbitrary/cs/append`, {
              specimen: resultMutable.specimen,
              growthOf: resultMutable.growthOf,
            });
          }
        }
        break;
      case "Serology": {
        const hasSelectedTest = resultMutable.hasOwnProperty("selectedTest");
        if (!hasSelectedTest) {
          handleUpdateState("selectedTest", "Both", false);
          resultMutable.selectedTest = "Both";
        }
        let fieldsCount = 0;

        switch (resultMutable.selectedTest) {
          case "Both":
            fieldsCount = 7;
            break;
          case "Wright": {
            fieldsCount = 3;
            delete resultMutable["Typhi. ( O )"];
            delete resultMutable["Typhi. ( H )"];
            delete resultMutable["Para A ( H )"];
            delete resultMutable["Para B ( H )"];
            break;
          }
          case "Widal": {
            fieldsCount = 5;
            delete resultMutable["B. Abortus"];
            delete resultMutable["B. Melitensis"];
            break;
          }
        }
        if (Object.keys(resultMutable).length !== fieldsCount) {
          shouldStop = true;
        }
        if (!shouldStop) {
          await api.put(`/arbitrary/serology/append`, {
            serology: resultMutable,
          });
        }
        break;
      }
    }
    if (shouldStop) {
      toast.error("يرجى تعبئة جميع حقول التحليل");
      return;
    }
    const readyTest = test;
    readyTest.test.template.result = resultMutable;
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
          Serology: (
            <SerologyTemplateInput
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
