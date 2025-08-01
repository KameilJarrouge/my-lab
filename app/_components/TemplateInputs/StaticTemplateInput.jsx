"use client";
import React, { useEffect, useState } from "react";
import UrinalysisTemplateInput from "./PresetTemplates/UrinalysisTemplateInput";
import HematologyCoagulationTemplateInput from "./PresetTemplates/HematologyCoagulationTemplateInput";
import { toast } from "react-toastify";
import CultureAndSensitivityTemplateInput from "./PresetTemplates/CultureAndSensitivityTemplateInput";
import api from "@/app/_lib/api";
import SerologyTemplateInput from "./PresetTemplates/SerologyTemplateInput";
import SemenAnalysisTemplateInput from "./PresetTemplates/SemenAnalysisTemplateInput";
import getDefaultResult from "./Defaults/defaultResult";
import hematologyCoagulationValidation from "./Validation/hematologyCoagulationValidation";
import cultureAndSensitivityValidation from "./Validation/cultureAndSensitivityValidation";
import semenAnalysisValidation from "./Validation/semenAnalysisValidation";
import urinalysisValidation from "./Validation/urinalysisValidation";
import serologyValidation from "./Validation/serologyValidation";
import BloodTypeTemplateInput from "./PresetTemplates/BloodTypeTemplateInput";
import PTTemplateInput from "./PresetTemplates/PTTemplateInput";
import PTTTemplateInput from "./PresetTemplates/PTTTemplateInput";
import PregnancyTestTemplateInput from "./PresetTemplates/PregnancyTestTemplateInput";
import PTValidation from "./Validation/PTValidation";
import PTTValidation from "./Validation/PTTValidation";
import ESRTemplateInput from "./PresetTemplates/ESRTemplateInput";
import BilirubinTemplateInput from "./PresetTemplates/BilirubinTemplateInput";
import ProteinTemplateInput from "./PresetTemplates/ProteinTemplateInput";
import normalValidation from "./Validation/normalValidation";
import StoolExaminationTemplateInput from "./PresetTemplates/StoolExaminationTemplateInput";
import HemoglobinTemplateInput from "./PresetTemplates/HemoglobinTemplateInput";
import BloodFilmTemplateInput from "./PresetTemplates/BloodFilmTemplateInput";
import HematologyCoagulationLeucocytesTemplateInput from "./PresetTemplates/HematologyCoagulationLeucocytesTemplateInput";
import HematologyCoagulationErythrocytesTemplateInput from "./PresetTemplates/HematologyCoagulationErythrocytesTemplateInput";
import AuthButton from "../Buttons/AuthButton";
import getEmptyResult from "./Empty/emptyResult";
import NoteModal from "../Modals/NoteModal";
import { MdCheck } from "react-icons/md";
import CSFTemplateInput from "./PresetTemplates/CSFTemplateInput";

function StaticTemplateInput({
  test,
  updateTemplate,
  lastTest,
  setOverrideSerologyUnits,
}) {
  const [result, setResult] = useState(test.test.template.result || {});
  const [isDirty, setIsDirty] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [note, setNote] = useState(null);

  const handleRestore = () => {
    if (test.test.template.hasOwnProperty("result")) {
      setResult(test.test.template.result);
    } else {
      // restore to defaults result (per template)
      setResult(getDefaultResult(test.test.template.staticTemplate));
    }
    setIsDirty(false);
  };

  const handleSetDefault = () => {
    if (
      !confirm(
        "هل تريد إدخال النتائج الافتراضية في هذا التحليل؟ في حال لم يتم حفظ نتائج سابقة لا يمكن استعادة النتائج."
      )
    )
      return;
    setResult(getDefaultResult(test.test.template.staticTemplate));
    setIsDirty(true);
  };
  const handleSetEmpty = () => {
    if (
      !confirm(
        "هل تريد إدخال نتائج فارغة في هذا التحليل؟ في حال لم يتم حفظ نتائج سابقة لا يمكن استعادة النتائج."
      )
    )
      return;
    setResult(getEmptyResult(test.test.template.staticTemplate));
    setIsDirty(true);
  };

  const handleSave = async () => {
    let shouldStop = false;
    let resultMutable = structuredClone(result);
    switch (test.test.template.staticTemplate) {
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
      case "CSF":
        if (!normalValidation(resultMutable)) {
          shouldStop = true;
        } else {
          // add arbitrary values to the db
          await api.put(`/arbitrary/csf/append`, {
            csf: {
              Color: resultMutable.Color,
              Appearance: resultMutable.Appearance,
            },
          });
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
    const readyTest = test;
    readyTest.test.template.result = resultMutable;
    updateTemplate(readyTest);
    setIsDirty(false);
  };

  useEffect(() => {
    if (!isNoteModalOpen) handleSaveNote();
  }, [isNoteModalOpen]);

  const handleSaveNote = () => {
    const readyTest = test;
    readyTest.test.template.note = note;

    updateTemplate(readyTest);
  };

  const handleUpdateState = (row, value, shouldBeANumber = true) => {
    if (isNaN(value) && shouldBeANumber) return;

    let tempResult = structuredClone(result);
    tempResult[row] = value;
    setResult(tempResult);
    setIsDirty(true);
  };

  useEffect(() => {
    if (
      JSON.stringify(result) !== "{}" &&
      JSON.stringify(test.test.template.result) !== "{}"
    )
      return;
    const defaultResult = getDefaultResult(test.test.template.staticTemplate);
    const readyTest = test;
    readyTest.test.template.result = defaultResult;
    updateTemplate(readyTest);
    setResult(defaultResult);
  }, []);

  useEffect(() => {
    if (result.hasOwnProperty("selectedTest")) {
      if (result.selectedTest === "Both") {
        setOverrideSerologyUnits(true);
      } else {
        setOverrideSerologyUnits(false);
      }
    }
  }, [result]);

  // useEffect(() => {
  //   if (
  //     JSON.stringify(result) !== JSON.stringify(test.test.template.result || {})
  //   ) {
  //     setIsDirty(true);
  //   }
  // }, [result]);

  return (
    <div className="w-full flex flex-col gap-4 relative">
      <NoteModal
        isOpen={isNoteModalOpen}
        setIsOpen={setIsNoteModalOpen}
        uniqueName={test.test.name}
        note={note}
        setNote={setNote}
      />
      <div className="w-fit h-fit absolute bottom-0 right-0 flex gap-2 items-center">
        <AuthButton title="نتائج فارغة" onClick={handleSetEmpty} />
        <AuthButton title="نتائج افتراضية" onClick={handleSetDefault} />
        <AuthButton title="ملاحظات" onClick={() => setIsNoteModalOpen(true)} />
        {note !== null && <MdCheck className="text-green-500" />}
      </div>
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
          "Hematology - Coagulation - Leucocytes": (
            <HematologyCoagulationLeucocytesTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
              lastTest={lastTest}
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
          "Semen Analysis": (
            <SemenAnalysisTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
            />
          ),
          "Blood Type": (
            <BloodTypeTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
            />
          ),
          "Prothrombin Time (PT)": (
            <PTTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
            />
          ),
          "Partial Thromboplastin Time (PTT)": (
            <PTTTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
            />
          ),
          "Pregnancy Test": (
            <PregnancyTestTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
            />
          ),
          ESR: (
            <ESRTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
            />
          ),
          Bilirubin: (
            <BilirubinTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
            />
          ),
          Protein: (
            <ProteinTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
            />
          ),
          "Stool Examination": (
            <StoolExaminationTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
            />
          ),
          Hemoglobin: (
            <HemoglobinTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
            />
          ),
          "Blood Film": (
            <BloodFilmTemplateInput
              handleSave={handleSave}
              handleRestore={handleRestore}
              isDirty={isDirty}
              result={result}
              setResult={handleUpdateState}
            />
          ),
          CSF: (
            <CSFTemplateInput
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
