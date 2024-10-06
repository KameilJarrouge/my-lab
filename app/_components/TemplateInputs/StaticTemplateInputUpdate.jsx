"use client";
import React, { useEffect, useState } from "react";
import UrinalysisTemplateInput from "./PresetTemplates/UrinalysisTemplateInput";
import HematologyCoagulationTemplateInput from "./PresetTemplates/HematologyCoagulationTemplateInput";
import { toast } from "react-toastify";
import api from "@/app/_lib/api";
import CultureAndSensitivityTemplateInput from "./PresetTemplates/CultureAndSensitivityTemplateInput";
import SerologyTemplateInput from "./PresetTemplates/SerologyTemplateInput";
import SemenAnalysisTemplateInput from "./PresetTemplates/SemenAnalysisTemplateInput";
import hematologyCoagulationValidation from "./Validation/hematologyCoagulationValidation";
import semenAnalysisValidation from "./Validation/semenAnalysisValidation";
import urinalysisValidation from "./Validation/urinalysisValidation";
import cultureAndSensitivityValidation from "./Validation/cultureAndSensitivityValidation";
import serologyValidation from "./Validation/serologyValidation";

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
    let resultMutable = structuredClone(result);
    switch (visitTest.template.staticTemplate) {
      case "Hematology - Coagulation":
        if (!hematologyCoagulationValidation(resultMutable)) {
          shouldStop = true;
        }
        break;
      case "Semen Analysis":
        if (!semenAnalysisValidation(resultMutable)) {
          shouldStop = true;
        } else {
          await api.put(`/arbitrary/semen-analysis/append`, {
            semenAnalysis: resultMutable,
          });
        }
        break;
      case "تحليل البول Urinalysis":
        if (!urinalysisValidation(resultMutable)) {
          shouldStop = true;
        } else {
          await api.put(`/arbitrary/urinalysis/append`, {
            urinalysis: resultMutable,
          });
        }
        break;
      case "Culture And Sensitivity":
        if (!cultureAndSensitivityValidation(resultMutable)) {
          shouldStop = true;
        } else {
          // add arbitrary values to the db
          await api.put(`/arbitrary/cs/append`, {
            specimen: resultMutable.specimen,
            growthOf: resultMutable.growthOf,
          });
        }
        break;
      case "Serology": {
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
        if (!serologyValidation(resultMutable, fieldsCount)) {
          shouldStop = true;
        } else {
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
    setIsLoading(true);
    const newTemplate = structuredClone(visitTest.template);
    newTemplate.result = resultMutable;
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
          "Semen Analysis": (
            <SemenAnalysisTemplateInput
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
