"use client";
import React, { useState } from "react";
import AuthButton from "../../Buttons/AuthButton";
import TextInput from "../../Inputs/TextInput";

function BilirubinTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  saveButtonTitle = "حفظ",
}) {
  const [shouldWarn, setShouldWarn] = useState(false);
  return (
    <div className="flex flex-col justify-end gap-4 w-full" dir="ltr">
      <div className="flex  items-center gap-10">
        <span className="w-[15ch]">Total Bilirubin</span>
        <div
          className={`border-b ${
            shouldWarn && !result["Total Bilirubin"]
              ? "border-b-warning"
              : " border-transparent"
          } w-[40ch]`}
        >
          <TextInput
            withHoveringTitle={false}
            state={result["Total Bilirubin"]}
            setState={(value) => setResult("Total Bilirubin", value, false)}
            title={"Result"}
          />{" "}
        </div>
        <span>up to 1.2</span>
      </div>
      <div className="flex  items-center gap-10">
        <span className="w-[15ch]">Direct Bilirubin</span>
        <div
          className={`border-b ${
            shouldWarn && !result["Direct Bilirubin"]
              ? "border-b-warning"
              : " border-transparent"
          } w-[40ch]`}
        >
          <TextInput
            withHoveringTitle={false}
            state={result["Direct Bilirubin"]}
            setState={(value) => setResult("Direct Bilirubin", value, false)}
            title={"Result"}
          />{" "}
        </div>
        <span>up to 0.25</span>
      </div>
      <div className="flex  items-center gap-10">
        <span className="w-[15ch]">Indirect Bilirubin</span>
        <div
          className={`border-b ${
            shouldWarn && !result["Indirect Bilirubin"]
              ? "border-b-warning"
              : " border-transparent"
          } w-[40ch]`}
        >
          <TextInput
            withHoveringTitle={false}
            state={result["Indirect Bilirubin"]}
            setState={(value) => setResult("Indirect Bilirubin", value, false)}
            title={"Result"}
          />{" "}
        </div>
        <span>up to 1</span>
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

export default BilirubinTemplateInput;
