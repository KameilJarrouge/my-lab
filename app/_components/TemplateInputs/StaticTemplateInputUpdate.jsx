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
import BloodTypeTemplateInput from "./PresetTemplates/BloodTypeTemplateInput";
import PTValidation from "./Validation/PTValidation";
import PTTValidation from "./Validation/PTTValidation";
import PTTemplateInput from "./PresetTemplates/PTTemplateInput";
import PTTTemplateInput from "./PresetTemplates/PTTTemplateInput";
import PregnancyTestTemplateInput from "./PresetTemplates/PregnancyTestTemplateInput";
import normalValidation from "./Validation/normalValidation";
import ESRTemplateInput from "./PresetTemplates/ESRTemplateInput";
import BilirubinTemplateInput from "./PresetTemplates/BilirubinTemplateInput";
import ProteinTemplateInput from "./PresetTemplates/ProteinTemplateInput";
import StoolExaminationTemplateInput from "./PresetTemplates/StoolExaminationTemplateInput";
import HemoglobinTemplateInput from "./PresetTemplates/HemoglobinTemplateInput";
import BloodFilmTemplateInput from "./PresetTemplates/BloodFilmTemplateInput";
import HematologyCoagulationLeucocytesTemplateInput from "./PresetTemplates/HematologyCoagulationLeucocytesTemplateInput";
import HematologyCoagulationErythrocytesTemplateInput from "./PresetTemplates/HematologyCoagulationErythrocytesTemplateInput";

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
      case "Stool Examination":
        if (!normalValidation(resultMutable)) {
          shouldStop = true;
        } else {
          await api.put(`/arbitrary/stool/append`, {
            stoolExamination: resultMutable,
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
      case "Prothrombin Time (PT)":
        if (!PTValidation(resultMutable)) {
          shouldStop = true;
        }
        break;
      case "Partial Thromboplastin Time (PTT)":
        if (!PTTValidation(resultMutable)) {
          shouldStop = true;
        }
        break;
      default:
        if (!normalValidation(resultMutable)) {
          shouldStop = true;
        }
        break;
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
          "Hematology - Coagulation - Leucocytes": (
            <HematologyCoagulationLeucocytesTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              lastTest={lastTest}
              saveButtonTitle="تعديل"
            />
          ),
          "Hematology - Coagulation - Erythrocytes": (
            <HematologyCoagulationErythrocytesTemplateInput
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
              saveButtonTitle="تعديل"
            />
          ),
          "Semen Analysis": (
            <SemenAnalysisTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              saveButtonTitle="تعديل"
            />
          ),
          "Blood Type": (
            <BloodTypeTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              saveButtonTitle="تعديل"
            />
          ),
          "Prothrombin Time (PT)": (
            <PTTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              saveButtonTitle="تعديل"
            />
          ),
          "Partial Thromboplastin Time (PTT)": (
            <PTTTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              saveButtonTitle="تعديل"
            />
          ),
          "Pregnancy Test": (
            <PregnancyTestTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              saveButtonTitle="تعديل"
            />
          ),
          ESR: (
            <ESRTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              saveButtonTitle="تعديل"
            />
          ),
          Bilirubin: (
            <BilirubinTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              saveButtonTitle="تعديل"
            />
          ),
          Protein: (
            <ProteinTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              saveButtonTitle="تعديل"
            />
          ),
          "Stool Examination": (
            <StoolExaminationTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              saveButtonTitle="تعديل"
            />
          ),
          Hemoglobin: (
            <HemoglobinTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              saveButtonTitle="تعديل"
            />
          ),
          "Blood Film": (
            <BloodFilmTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              saveButtonTitle="تعديل"
            />
          ),
        }[visitTest.template.staticTemplate]
      }
    </div>
  );
}

export default StaticTemplateInputUpdate;
