"use client";
import React, { useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import TextInput from "../../Inputs/TextInput";
import AuthButton from "../../Buttons/AuthButton";

function PTTemplateInput({
  result,
  handleRestore,
  handleSave,
  isDirty,
  setResult,
  saveButtonTitle = "حفظ",
}) {
  // Prothrombin Time
  const [shouldWarn, setShouldWarn] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div
        className={"grid grid-cols-7 w-full items-center gap-2 px-4"}
        dir="ltr"
      >
        {/* First Row */}
        <span className="col-span-2"> Prothrombin Time (PT)</span>
        <div
          className={`border-b ${
            shouldWarn && !result.pt1
              ? "border-b-warning"
              : " border-transparent"
          }`}
        >
          <TextInput
            withHoveringTitle={false}
            state={result.pt1}
            setState={(value) => setResult("pt1", value, false)}
            title={"Result"}
          />
        </div>
        <span>sec</span>
        <span>
          <MdArrowRightAlt className="w-[1.5rem] h-fit text-text" />
        </span>
        <div
          className={`border-b ${
            shouldWarn && !result.pt2
              ? "border-b-warning"
              : " border-transparent"
          }`}
        >
          <TextInput
            withHoveringTitle={false}
            state={result.pt2}
            setState={(value) => setResult("pt2", value, false)}
            title={"Result"}
          />
        </div>
        <span>%</span>
        {/* Second Row */}
        <span className="col-span-2"> Control</span>
        <div
          className={`border-b ${
            shouldWarn && !result.control1
              ? "border-b-warning"
              : " border-transparent"
          }`}
        >
          <TextInput
            withHoveringTitle={false}
            state={result.control1}
            setState={(value) => setResult("control1", value, false)}
            title={"Result"}
          />
        </div>
        <span>sec</span>
        <span>
          <MdArrowRightAlt className="w-[1.5rem] h-fit text-text" />
        </span>
        <div
          className={`border-b ${
            shouldWarn && !result.control2
              ? "border-b-warning"
              : " border-transparent"
          }`}
        >
          <TextInput
            withHoveringTitle={false}
            state={result.control2}
            setState={(value) => setResult("control2", value, false)}
            title={"Result"}
          />
        </div>
        <span>%</span>
        {/* Third Row */}
        <span className="col-span-2"> INR</span>
        <div
          className={`border-b ${
            shouldWarn && !result.INR
              ? "border-b-warning"
              : " border-transparent"
          }`}
        >
          <TextInput
            withHoveringTitle={false}
            state={result.INR}
            setState={(value) => setResult("INR", value, false)}
            title={"Result"}
          />
        </div>
        <span className="col-span-4"></span>
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

export default PTTemplateInput;
