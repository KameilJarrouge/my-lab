"use client";
import React, { useEffect, useState } from "react";
import UrinalysisTemplateInput from "./PresetTemplates/UrinalysisTemplateInput";
import HematologyCoagulationTemplateInput from "./PresetTemplates/HematologyCoagulationTemplateInput";
import { toast } from "react-toastify";
import api from "@/app/_lib/api";
import CultureAndSensitivityTemplateInput from "./PresetTemplates/CultureAndSensitivityTemplateInput";
import SerologyTemplateInput from "./PresetTemplates/SerologyTemplateInput";

function StaticTemplateInputUpdate({
  visitTest,
  lastTest,
  triggerRefresh,
  setIsLoading,
}) {
  const [result, setResult] = useState(visitTest.template.result || {});
  const [isDirty, setIsDirty] = useState(false);

  const handleRestore = () => {
    if (visitTest.template.hasOwnProperty("result")) {
      setResult(visitTest.template.result);
    } else {
      setResult({});
    }
    setIsDirty(false);
  };

  const handleSave = async () => {
    let shouldStop = false;
    switch (visitTest.template.staticTemplate) {
      case "Hematology - Coagulation":
        if (Object.keys(result).length !== 18) {
          shouldStop = true;
        }
        break;

      case "تحليل البول Urinalysis":
        let fieldsCount = result.hasOwnProperty("Dynamic") ? 20 : 19;
        if (Object.keys(result).length !== fieldsCount) {
          shouldStop = true;
        } else {
          await api.put(`/arbitrary/urinalysis/append`, {
            urinalysis: result,
          });
        }
        break;
      case "Culture And Sensitivity":
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
      case "Serology": {
        const hasSelectedTest = result.hasOwnProperty("selectedTest");
        let resultTemp = structuredClone(result);
        if (!hasSelectedTest) {
          handleUpdateState("selectedTest", "Both", false);
          resultTemp.selectedTest = "Both";
        }
        let fieldsCount = 0;

        switch (resultTemp.selectedTest) {
          case "Both":
            fieldsCount = 7;
            break;
          case "Wright": {
            fieldsCount = 3;
          }
          case "Widal": {
            fieldsCount = 5;
          }
        }
        if (Object.keys(resultTemp).length !== fieldsCount) {
          shouldStop = true;
        }
        if (!shouldStop) {
          await api.put(`/arbitrary/serology/append`, {
            serology: resultTemp,
          });
        }
        break;
      }
    }
    if (shouldStop) {
      toast.error("يرجى تعبئة جميع حقول التحليل");
      return;
    }
    setIsLoading(true);
    const newTemplate = structuredClone(visitTest.template);
    newTemplate.result = result;
    const updateResult = await api.put(
      `/visit-tests/${visitTest.id}/update-template`,
      { template: JSON.stringify(newTemplate) }
    );

    if (!updateResult.data.success) {
      toast.error("Check the console");
      console.error("Something went wrong while updating visitTest template");
      return;
    }
    toast("تم تعديل التحليل");
    triggerRefresh();
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
      JSON.stringify(result) !== JSON.stringify(visitTest.template.result || {})
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
              saveButtonTitle="تعديل"
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
              saveButtonTitle="تعديل"
            />
          ),
          "Culture And Sensitivity": (
            <CultureAndSensitivityTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              saveButtonTitle="تعديل"
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
        }[visitTest.template.staticTemplate]
      }
    </div>
  );
}

export default StaticTemplateInputUpdate;
