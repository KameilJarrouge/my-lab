"use client";
import api from "@/app/_lib/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AutoCompleteInput from "../../Inputs/AutoCompleteInput";
import AuthButton from "../../Buttons/AuthButton";

const macros = [
  { arabicName: "الحموضة", englishName: "PH" },
  { arabicName: "اللزوجة", englishName: "Viscosity" },
  { arabicName: "الحجم", englishName: "Volume", unit: "ml" },
  { arabicName: "اللون", englishName: "Color" },
];

const micros1 = [
  { arabicName: "الأشكال الشاذة", englishName: "Abnormal Forms", unit: "%" },
  { arabicName: "الأشكال الطبيعية", englishName: "Normal Forms", unit: "%" },
  { arabicName: "التعداد", englishName: "Sperm Count", unit: "/ml" },
  {
    arabicName: "طلائع النطاف",
    englishName: "Spermatogenic Cells",
    unit: "/HPF",
  },
  { arabicName: "الكريات الحمر", englishName: "Erythrocytes", unit: "/HPF" },
  { arabicName: "الكريات البيض", englishName: "Leucocytes", unit: "/HPF" },
];

const micros2 = [
  { arabicName: "الحركة المباشرة", englishName: "Directl Motility" },
  { arabicName: "الحركة بعد ساعة", englishName: "Motility After 1 hr" },
  { arabicName: "الحركة بعد ساعتين", englishName: "Motility After 2 hr" },
];

function SemenAnalysisTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  saveButtonTitle = "حفظ",
}) {
  const [shouldWarn, setShouldWarn] = useState(false);
  const [options, setOptions] = useState({});
  const getOptions = async () => {
    const result = await api.get("/arbitrary/semen-analysis/get");
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error(
        "Something went wrong while fetching options for serology in Input"
      );
      return;
    }
    setOptions(JSON.parse(result.data.result.SemenAnalysis));
  };

  useEffect(() => {
    getOptions();
  }, []);
  return (
    <div
      className="flex flex-col  gap-6 w-full h-fit px-2 overflow-hidden overflow-x-hidden"
      dir="ltr"
    >
      <span className="border-b border-text w-fit">
        SEMEN ANALYSIS السائل المنوي
      </span>
      <div className="w-full flex flex-col gap-4 items-center">
        <span className="border-b border-text w-fit">
          Macroscopic Examination الفحص العياني
        </span>
        <div className="grid grid-cols-4 w-full ">
          {macros.map((macro, index) => (
            <Field
              key={index}
              arabicName={macro.arabicName}
              englishName={macro.englishName}
              unit={macro.unit}
              options={options}
              result={result}
              setResult={setResult}
              shouldWarn={shouldWarn}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 items-center">
        <span className="border-b border-text w-fit">
          Microscopic Examination الفحص المجهري
        </span>
        <div className="grid grid-cols-3 gap-4 w-full ">
          {micros1.map((micro, index) => (
            <Field
              key={index}
              arabicName={micro.arabicName}
              englishName={micro.englishName}
              unit={micro.unit}
              options={options}
              result={result}
              setResult={setResult}
              shouldWarn={shouldWarn}
            />
          ))}
        </div>

        <div className="flex gap-8 items-center w-[80%] justify-center ">
          <div className="flex flex-col items-end gap-0.5">
            <span className="invisible">{"hold"}</span>
            <span className="invisible">{"hold"} </span>
            <span className="w-[10ch] text-end py-1 rounded">Very Active</span>
            <span className="w-[10ch] text-end py-1 rounded">Active</span>
            <span className="w-[10ch] text-end py-1 rounded">Inactive</span>
          </div>
          {micros2.map((micro, index) => (
            <Field2
              key={index}
              arabicName={micro.arabicName}
              englishName={micro.englishName}
              options={options}
              result={result}
              setResult={setResult}
              shouldWarn={shouldWarn}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-4">
        <AuthButton
          title={`${isDirty ? "*" : ""} ${saveButtonTitle}`}
          onClick={() => {
            setShouldWarn(true);
            handleSave();
          }}
        />
        {isDirty && (
          <AuthButton
            title="استعادة"
            onClick={() => {
              handleRestore();
              setShouldWarn(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

function Field({
  arabicName,
  englishName,
  unit,
  options,
  result,
  setResult,
  shouldWarn,
}) {
  return (
    <div
      className={`flex gap-1 items-start justify-center border-b ${
        shouldWarn && !result[englishName]
          ? "border-b-warning"
          : "border-transparent"
      }`}
    >
      <div className="flex flex-col items-center gap-0.5">
        <span>{arabicName}</span>
        <span>{englishName} </span>
        <AutoCompleteInput
          title={"Result"}
          options={options[englishName] || []}
          state={result[englishName] || ""}
          setState={(value) => setResult(englishName, value, false)}
          id={englishName}
          withHoveringTitle={false}
        />
      </div>
      <span className="min-w-[5ch] self-end">{unit || ""}</span>
    </div>
  );
}

function Field2({
  arabicName,
  englishName,
  options,
  result,
  setResult,
  shouldWarn,
}) {
  return (
    <div className="flex gap-1 items-start justify-center">
      <div className="flex flex-col items-center gap-0.5">
        <span>{arabicName}</span>
        <span>{englishName} </span>
        <div
          className={`border-b ${
            shouldWarn && !result[`${englishName} Very Active`]
              ? "border-b-warning"
              : "border-transparent"
          }`}
        >
          <AutoCompleteInput
            title={"Result"}
            options={options[`${englishName} Very Active`] || []}
            state={result[`${englishName} Very Active`] || ""}
            setState={(value) =>
              setResult(`${englishName} Very Active`, value, false)
            }
            id={`${englishName} Very Active`}
            withHoveringTitle={false}
          />
        </div>
        <div
          className={`border-b ${
            shouldWarn && !result[`${englishName} Active`]
              ? "border-b-warning"
              : "border-transparent"
          }`}
        >
          <AutoCompleteInput
            title={"Result"}
            options={options[`${englishName} Active`] || []}
            state={result[`${englishName} Active`] || ""}
            setState={(value) =>
              setResult(`${englishName} Active`, value, false)
            }
            id={`${englishName} Active`}
            withHoveringTitle={false}
          />
        </div>
        <div
          className={`border-b ${
            shouldWarn && !result[`${englishName} Inactive`]
              ? "border-b-warning"
              : "border-transparent"
          }`}
        >
          <AutoCompleteInput
            title={"Result"}
            options={options[`${englishName} Inactive`] || []}
            state={result[`${englishName} Inactive`] || ""}
            setState={(value) =>
              setResult(`${englishName} Inactive`, value, false)
            }
            id={`${englishName} Inactive`}
            withHoveringTitle={false}
          />
        </div>
      </div>
      <div className="flex flex-col items-center self-end gap-0.5">
        <span className="min-w-[2ch] py-1 self-end">{"%"}</span>
        <span className="min-w-[2ch] py-1 self-end">{"%"}</span>
        <span className="min-w-[2ch] py-1 self-end">{"%"}</span>
      </div>
    </div>
  );
}

export default SemenAnalysisTemplateInput;
