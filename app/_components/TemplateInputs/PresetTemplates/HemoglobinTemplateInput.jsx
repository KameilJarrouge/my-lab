"use client";
import React, { useState } from "react";
import TextInput from "../../Inputs/TextInput";
import AuthButton from "../../Buttons/AuthButton";

function HemoglobinTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  saveButtonTitle = "حفظ",
}) {
  const [shouldWarn, setShouldWarn] = useState(false);
  return (
    <div className="flex flex-col gap-2" dir="ltr">
      <div className="flex items-center gap-8">
        <div className="w-[25ch] flex justify-between">
          <span>Hemoglobin</span>
          <span>الخضاب</span>
        </div>
        <div
          className={`border-b ${
            shouldWarn && !result["Hemoglobin"]
              ? "border-b-warning"
              : " border-transparent"
          } w-[40ch]`}
        >
          <TextInput
            state={result["Hemoglobin"]}
            setState={(value) => setResult("Hemoglobin", value, false)}
            title={"Result"}
            className={"bg-transparent"}
            withHoveringTitle={false}
          />{" "}
        </div>
        <div className="flex flex-col">
          <span>Female: 12 - 16</span>
          <span>Male: 13 - 18</span>
        </div>
        <span>g/dL</span>
      </div>
      <div className="flex items-center gap-8">
        <div className="w-[25ch] flex justify-between">
          <span>Hematocrit</span>
          <span>الرسابة</span>
        </div>
        <div
          className={`border-b ${
            shouldWarn && !result["Hematocrit"]
              ? "border-b-warning"
              : " border-transparent"
          } w-[40ch]`}
        >
          <TextInput
            state={result["Hematocrit"]}
            setState={(value) => setResult("Hematocrit", value, false)}
            title={"Result"}
            className={"bg-transparent"}
            withHoveringTitle={false}
          />{" "}
        </div>
        <div className="flex flex-col">
          <span>Female: 35 - 47</span>
          <span>Male: 40 - 55</span>
        </div>
        <span>%</span>
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

export default HemoglobinTemplateInput;
