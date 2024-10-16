"use client";
import React, { useState } from "react";
import AuthButton from "../../Buttons/AuthButton";
import TextInput from "../../Inputs/TextInput";

function PTTTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  saveButtonTitle = "حفظ",
}) {
  // partial thromboplastin time
  const [shouldWarn, setShouldWarn] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div
        className={"grid grid-cols-9 w-full items-center gap-2  px-4"}
        dir="ltr"
      >
        <span className="col-span-2">PTT</span>
        <div
          className={`border-b ${
            shouldWarn && !result.ptt
              ? "border-b-warning"
              : " border-transparent"
          }`}
        >
          <TextInput
            withHoveringTitle={false}
            state={result.ptt}
            setState={(value) => setResult("ptt", value, false)}
            title={"Result"}
          />
        </div>{" "}
        <span>sec</span>
        <span className="col-span-2">Control</span>
        <div
          className={`border-b ${
            shouldWarn && !result.control
              ? "border-b-warning"
              : " border-transparent"
          }`}
        >
          <TextInput
            withHoveringTitle={false}
            state={result.control}
            setState={(value) => setResult("control", value, false)}
            title={"Result"}
          />
        </div>{" "}
        <span>sec</span>
        <span className="col-span-1"></span>
      </div>
      <div className="w-full flex justify-center items-center gap-4" dir="ltr">
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
              setShouldWarn(false);
              handleRestore();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default PTTTemplateInput;
