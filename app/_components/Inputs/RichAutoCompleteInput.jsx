"use client";
import React, { useState } from "react";
import { MdOutlineSuperscript } from "react-icons/md";
import AutoCompleteInput from "./AutoCompleteInput";
import raise from "@/app/_lib/raise";

function RichAutoCompleteInput({
  state,
  setState,
  title,
  options = [],
  uniqueName = "unique",
  dir = "rtl",
  ...props
}) {
  const [isRaised, setIsRaised] = useState(false);
  return (
    <div className="flex gap-2 items-center">
      <AutoCompleteInput
        options={options}
        id={`rich-text-${uniqueName}`}
        title={title}
        state={state}
        dir={dir}
        setState={(newValue, e) => {
          if (isRaised && newValue.length >= (state?.length || 0) && e) {
            const indexOfNewChar = e.target.selectionStart - 1;
            setState(
              newValue.substring(0, indexOfNewChar) +
                raise(newValue[indexOfNewChar]) +
                newValue.substring(indexOfNewChar + 1)
            );
            setTimeout(() => {
              e.target.setSelectionRange(
                indexOfNewChar + 1,
                indexOfNewChar + 1
              );
            }, 0);
          } else {
            setState(newValue);
          }
        }}
        {...props}
      />
      <button
        onClick={() => {
          setIsRaised((isRaised) => !isRaised);
          const element = document.getElementById(
            `rich-text-${uniqueName}-input`
          );
          if (element) element.focus();
        }}
      >
        <MdOutlineSuperscript
          className={`w-[1.4rem] h-fit   ${
            isRaised ? " text-light_text" : "text-dark_text"
          }`}
        />
      </button>
    </div>
  );
}

export default RichAutoCompleteInput;
