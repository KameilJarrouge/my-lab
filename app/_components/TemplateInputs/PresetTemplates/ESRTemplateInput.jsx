"use client";
import React, { useState } from "react";
import AuthButton from "../../Buttons/AuthButton";
import TextInput from "../../Inputs/TextInput";

function ESRTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  saveButtonTitle = "حفظ",
}) {
  const [shouldWarn, setShouldWarn] = useState(false);
  return (
    <div className="flex flex-col gap-4" dir="ltr">
      <div className="flex items-center gap-10 ">
        <span>ESR</span>
        <div className="flex items-center gap-2">
          <span>1hr.</span>
          <div
            className={`border-b ${
              shouldWarn && !result["1hr."]
                ? "border-b-warning"
                : " border-transparent"
            }`}
          >
            <TextInput
              withHoveringTitle={false}
              state={result["1hr."]}
              setState={(value) => setResult("1hr.", value, false)}
              title={"Result"}
            />{" "}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span>2hr.</span>
          <div
            className={`border-b ${
              shouldWarn && !result["2hr."]
                ? "border-b-warning"
                : " border-transparent"
            }`}
          >
            <TextInput
              withHoveringTitle={false}
              state={result["2hr."]}
              setState={(value) => setResult("2hr.", value, false)}
              title={"Result"}
            />{" "}
          </div>
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
              setShouldWarn(false);
              handleRestore();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ESRTemplateInput;
