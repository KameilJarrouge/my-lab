"use client";
import React, { useState } from "react";
import raise from "superscript-text";
import { MdOutlineSuperscript } from "react-icons/md";
import AutoCompleteInput from "./AutoCompleteInput";

function RichAutoCompleteInput({
  state,
  setState,
  title,
  options = [],
  uniqueName = "unique",
}) {
  const [isRaised, setIsRaised] = useState(false);
  return (
    <div className="flex gap-2 items-center">
      <AutoCompleteInput
        options={options}
        id={`rich-text-${uniqueName}`}
        title={title}
        state={state}
        setState={(newValue) => {
          const difference = newValue.length - state.length;
          if (isRaised && difference > 0) {
            // handle raising new characters
            setState(
              newValue.substring(0, newValue.length - difference) +
                raise(newValue.substring(newValue.length - difference))
            );
          } else {
            setState(newValue);
          }
        }}
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
