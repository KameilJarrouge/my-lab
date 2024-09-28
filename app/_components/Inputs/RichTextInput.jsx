"use client";
import React, { useState } from "react";
import TextInput from "./TextInput";
import raise from "superscript-text";
import { MdOutlineSuperscript } from "react-icons/md";

function RichTextInput({ state, setState, title, uniqueName = "unique" }) {
  const [isRaised, setIsRaised] = useState(false);
  return (
    <div className="flex gap-2 items-center">
      <TextInput
        id={`rich-text-${uniqueName}`}
        title={title}
        state={state}
        setState={(newValue, e) => {
          if (isRaised && newValue.length >= (state?.length || 0)) {
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
      />
      <button
        onClick={() => {
          setIsRaised((isRaised) => !isRaised);
          const element = document.getElementById(`rich-text-${uniqueName}`);
          if (element) element.focus();
        }}
      >
        <MdOutlineSuperscript
          className={`w-[1.4rem] h-fit ${
            isRaised ? " text-light_text" : "text-dark_text"
          }`}
        />
      </button>
    </div>
  );
}

export default RichTextInput;
