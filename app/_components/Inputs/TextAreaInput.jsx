"use client";
import React from "react";

function TextAreaInput({
  state,
  setState,
  title,
  className,
  rows = 10,
  ...props
}) {
  const handleChange = (e) => {
    setState(e.target.value);
  };
  return (
    <div className="w-full flex justify-center items-center  border-b-[1px] border-b-light_primary focus-within:border-b-light_text">
      <textarea
        {...props}
        placeholder={title}
        rows={rows}
        className={`w-full bg-input_background text-text resize-none  outline-none ${className}`}
        onChange={handleChange}
        value={state}
      />
    </div>
  );
}

export default TextAreaInput;
