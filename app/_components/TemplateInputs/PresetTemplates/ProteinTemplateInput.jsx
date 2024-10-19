"use client";
import React, { useState } from "react";
import AuthButton from "../../Buttons/AuthButton";
import TextInput from "../../Inputs/TextInput";

function ProteinTemplateInput({
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
      <div className="flex items-center gap-10">
        <span className="w-[15ch]">Total Protein</span>
        <div
          className={`border-b ${
            shouldWarn && !result["Total Protein"]
              ? "border-b-warning"
              : " border-transparent"
          } w-[40ch]`}
        >
          <TextInput
            withHoveringTitle={false}
            state={result["Total Protein"]}
            setState={(value) => setResult("Total Protein", value, true)}
            title={"Result"}
          />{" "}
        </div>{" "}
        <span className="w-[5rem]">6 - 8.5</span>
        <span>g/dL</span>
      </div>
      <div className="flex items-center gap-10">
        <span className="w-[15ch]">Albumin</span>
        <div
          className={`border-b ${
            shouldWarn && !result["Albumin"]
              ? "border-b-warning"
              : " border-transparent"
          } w-[40ch]`}
        >
          <TextInput
            withHoveringTitle={false}
            state={result["Albumin"]}
            setState={(value) => setResult("Albumin", value, true)}
            title={"Result"}
          />{" "}
        </div>{" "}
        <span className="w-[5rem]">3.5 - 5</span>
        <span>g/dL</span>
      </div>
      <div className="flex items-center gap-10">
        <span className="w-[15ch]">Globulin</span>
        {/* <div
          className={`border-b ${
            shouldWarn && !result["Globulin"]
              ? "border-b-warning"
              : " border-transparent"
          } w-[40ch]`}
        >
          <TextInput
            withHoveringTitle={false}
            state={result["Globulin"]}
            setState={(value) => setResult("Globulin", value, false)}
            title={"Result"}
          />{" "}
        </div>{" "} */}
        <span className="w-[40ch]">
          {Number(result["Total Protein"] - Number(result["Albumin"]))}
        </span>
        <span className="w-[5rem]">2.3 - 3.4</span>
        <span>g/dL</span>
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

export default ProteinTemplateInput;
