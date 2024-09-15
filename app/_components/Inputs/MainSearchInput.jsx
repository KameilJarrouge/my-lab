"use client";
import React from "react";
import DebounceInput from "./DebounceInput";

function MainSearchInput({ state, setState, ...props }) {
  return (
    <DebounceInput
      setDebounce={setState}
      className="w-full h-fit py-1 px-2 rounded bg-light_primary text-light_text outline-none text-center shadow shadow-black"
      placeholder="بحث"
      {...props}
    ></DebounceInput>
  );
}

export default MainSearchInput;
