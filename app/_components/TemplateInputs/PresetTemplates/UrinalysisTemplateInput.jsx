"use client";
import React, { useEffect, useState } from "react";
import AuthButton from "../../Buttons/AuthButton";
import DropMenu from "../../Inputs/DropMenu";
import TextInput from "../../Inputs/TextInput";
import AutoCompleteInput from "../../Inputs/AutoCompleteInput";
import api from "@/app/_lib/api";
import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function UrinalysisTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  saveButtonTitle = "حفظ",
}) {
  const [shouldWarn, setShouldWarn] = useState(false);
  const [options, setOptions] = useState({});

  const updateDynamicFields = (index, isUpdatingName, value) => {
    let dFields = [...(result.Dynamic || [])];
    let atIndex = structuredClone(dFields[index]);
    atIndex[isUpdatingName ? "name" : "value"] = value;
    dFields[index] = atIndex;
    // setDynamicFields(dFields);
    setResult("Dynamic", [...dFields], false);
  };

  const removeDynamicField = (indexToRemove) => {
    let dFields = [...(result.Dynamic || [])];
    dFields = dFields.filter((dField, index) => indexToRemove !== index);

    // setDynamicFields(dFields);
    setResult("Dynamic", dFields, false);
  };

  const addDynamicField = () => {
    const dFields = [...(result.Dynamic || []), { name: "", value: "" }];
    // setDynamicFields(dFields);
    setResult("Dynamic", dFields, false);
  };

  const getOptions = async () => {
    const result = await api.get("/arbitrary/urinalysis/get");
    if (!result.data.success) {
      toast.error("Check the Console!");
      console.error(
        "Something went wrong while fetching options for urinalysis in Input"
      );
      return;
    }

    setOptions(JSON.parse(result.data.result.Urinalysis));
    console.log("result.data.result.Urinalysis", result.data.result.Urinalysis);
  };

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <div
      className="flex flex-col items-start gap-4 w-full h-full px-2 "
      dir="ltr"
    >
      <span className="border-b border-text w-fit ">
        تحليل البول URINALYSIS
      </span>
      <div className="flex justify-between items-start  w-full">
        <div className="flex flex-col gap-4 w-[30%] h-full">
          <Input
            shouldWarn={shouldWarn}
            arabicName={"اللون"}
            options={options["Color"] || []}
            englishName={"Color"}
            state={result}
            setState={setResult}
          />
          <Input
            shouldWarn={shouldWarn}
            arabicName={"المظهر"}
            options={options["Appearance"] || []}
            englishName={"Appearance"}
            state={result}
            setState={setResult}
          />
          <Input
            shouldWarn={shouldWarn}
            arabicName={"النقل النوعي"}
            options={options["Specific Gravity"] || []}
            englishName={"Specific Gravity"}
            state={result}
            setState={setResult}
          />
          <Input
            shouldWarn={shouldWarn}
            arabicName={"الحموضىة"}
            englishName={"pH"}
            options={options["pH"] || []}
            state={result}
            setState={setResult}
          />
        </div>

        <div className="flex flex-col gap-4 w-[30%]">
          <Input
            shouldWarn={shouldWarn}
            arabicName={"الغلوكوز"}
            englishName={"Glucose"}
            options={options["pH"] || []}
            state={result}
            setState={setResult}
          />
          <Input
            shouldWarn={shouldWarn}
            arabicName={"البروتين"}
            englishName={"Protein"}
            options={options["Protein"] || []}
            state={result}
            setState={setResult}
          />
          <Input
            shouldWarn={shouldWarn}
            arabicName={"الخضاب"}
            englishName={"Hemoglobin"}
            options={options["Hemoglobin"] || []}
            state={result}
            setState={setResult}
          />
        </div>
        <div className="flex flex-col gap-4 w-[30%]">
          <Input
            shouldWarn={shouldWarn}
            arabicName={"مولد اليوروبيلين"}
            englishName={"Urobilinogen"}
            options={options["Urobilinogen"] || []}
            state={result}
            setState={setResult}
          />
          <Input
            shouldWarn={shouldWarn}
            arabicName={"البليروبين"}
            englishName={"Bilirubin"}
            options={options["Bilirubin"] || []}
            state={result}
            setState={setResult}
          />
          <Input
            shouldWarn={shouldWarn}
            arabicName={"النتريت"}
            englishName={"Nitrite"}
            options={options["Nitrite"] || []}
            state={result}
            setState={setResult}
          />
          <Input
            shouldWarn={shouldWarn}
            arabicName={"الكيتون"}
            englishName={"Ketone"}
            options={options["Ketone"] || []}
            state={result}
            setState={setResult}
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-4">
        <span className="border-b border-text w-fit">
          الفحص المجهري Microscopic Examination
        </span>
        <div className="w-full flex justify-between items-start ">
          <div className="flex flex-col gap-4 w-[30%]">
            <Input
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              arabicName={"الكريات البيض"}
              englishName={"Leucocytes"}
              options={options["Leucocytes"] || []}
            />
            <Input
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              arabicName={"الكريات الحمر"}
              englishName={"Erythrocytes"}
              options={options["Erythrocytes"] || []}
            />
            <Input
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              arabicName={"الخلايا الظهارية"}
              englishName={"Epithelial Cells"}
              options={options["Epithelial Cells"] || []}
            />
            <Input
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              arabicName={"الاسطوانات"}
              englishName={"Cylinders"}
              options={options["Cylinders"] || []}
            />
          </div>
          <div className="flex flex-col gap-4 w-[30%] h-full">
            <Input
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              arabicName={"اكسالات الكالسيوم"}
              englishName={"Ca. Oxalate"}
              options={options["Ca. Oxalate"] || []}
            />
            <Input
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              arabicName={"اليورات"}
              englishName={"Urate"}
              options={options["Urate"] || []}
            />
            <Input
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              arabicName={"اليوريك اسيد"}
              englishName={"Uric Acid"}
              options={options["Uric Acid"] || []}
            />
            <Input
              shouldWarn={shouldWarn}
              state={result}
              setState={setResult}
              arabicName={"الفوسفات"}
              englishName={"Phosphate"}
              options={options["Phosphate"] || []}
            />
          </div>

          <div className="flex flex-col gap-11 mt-[0.75rem] w-[30%]">
            {(result.Dynamic || []).map((dField, index) => {
              if (index >= 4) return;
              return (
                <DynamicInput
                  options={options["Dynamic"] || []}
                  nameState={result["Dynamic"][index].name || ""}
                  valueState={result["Dynamic"][index].value || ""}
                  index={index}
                  shouldWarn={shouldWarn}
                  updateValue={updateDynamicFields}
                  remove={() => removeDynamicField(index)}
                  key={index}
                />
              );
            })}
            {(result.Dynamic || []).length < 4 && (
              <button
                onClick={addDynamicField}
                className="w-[50%] self-center flex   justify-center h-fit bg-light_primary hover:bg-secondary text-text hover:text-white rounded p-1"
              >
                <IoMdAdd className="w-[1.4rem] h-fit" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between flex-wrap gap-8">
        {(result.Dynamic || []).map((dField, index) => {
          if (index < 4) return;
          return (
            <div className="w-[30%] h-[2ch]">
              <DynamicInput
                options={options["Dynamic"] || []}
                nameState={result["Dynamic"].name || ""}
                valueState={result["Dynamic"].value || ""}
                index={index}
                shouldWarn={shouldWarn}
                updateValue={updateDynamicFields}
                remove={() => removeDynamicField(index)}
                key={index}
              />
            </div>
          );
        })}

        {(result.Dynamic || []).length >= 4 && (
          <div className="w-[30%] flex items-center">
            <button
              onClick={addDynamicField}
              className="w-[88%] self-center flex   justify-center h-fit bg-light_primary hover:bg-secondary text-text hover:text-white rounded "
            >
              <IoMdAdd className="w-[1.4rem] h-fit" />
            </button>
            <span className="w-[12%] invisible">{"h"}</span>
          </div>
        )}
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

function Input({
  arabicName,
  englishName,
  state,
  setState,
  options,
  shouldWarn,
  withSlashField = false,
  withParenthesis = false,
}) {
  return (
    <div
      className={`w-full max-w-[40ch] h-fit flex justify-between items-center border-b ${
        shouldWarn && !state[englishName]
          ? "border-b-warning"
          : "border-transparent"
      }`}
    >
      <div className="flex flex-col gap-2 text-left">
        <span>{arabicName}</span>
        <span>{englishName}</span>
      </div>
      <span
        className={`w-[15ch] h-fit ${
          (withSlashField || withParenthesis) && "flex items-center gap-2"
        }`}
        dir="ltr"
      >
        {withParenthesis && <span>{"("}</span>}

        <AutoCompleteInput
          title={"Result"}
          options={options}
          state={state[englishName] || ""}
          setState={(value) => setState(englishName, value, false)}
          id={englishName}
          withHoveringTitle={false}
        />
        {withParenthesis && <span>{")"}</span>}
        {withSlashField && <span>/field</span>}
      </span>
    </div>
  );
}
function DynamicInput({
  nameState,
  valueState,
  index,
  updateValue,
  options,
  shouldWarn,
  remove,
}) {
  return (
    <div
      key={index}
      className={`w-full max-w-[40ch] h-fit flex justify-between items-center border-b relative ${
        shouldWarn && (!nameState || !valueState)
          ? "border-b-warning"
          : "border-transparent"
      }`}
    >
      <div className="flex flex-col gap-2 text-left w-[20ch]">
        <AutoCompleteInput
          options={options}
          state={nameState}
          setState={(value) => updateValue(index, true, value)}
          id={index}
          withHoveringTitle={false}
          title={"حقل ديناميكي"}
        />
      </div>
      <div className="w-[15ch] h-fit  " dir="ltr">
        <TextInput
          state={valueState}
          setState={(value) => updateValue(index, false, value)}
          title={"Result"}
          withHoveringTitle={false}
          id={index}
        />
      </div>
      <button
        className=" absolute top-[0.375rem] -right-[3.5rem] w-[5ch] h-fit text-text hover:text-red-400"
        onClick={remove}
      >
        <MdDelete />
      </button>
    </div>
  );
}

export default UrinalysisTemplateInput;
